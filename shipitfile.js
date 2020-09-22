module.exports = (shipit) => {
  require("shipit-deploy")(shipit);
  require("shipit-shared")(shipit);

  const appName = "dyne";

  shipit.initConfig({
    default: {
      deployTo: "/home/ec2-user/dishin-frontend",
      repositoryUrl:
        "https://Arielolin@bitbucket.org/nivsegal/dishin-frontend.git",
      keepReleases: 3,
      shared: {
        overwrite: true,
        dirs: ["node_modules"],
      },
    },
    production: {
      servers: "ec2-user@ec2-3-127-44-14.eu-central-1.compute.amazonaws.com",
      branch: "Ariel",
      key: "~/Keys/Niv2.pem",
    },
  });

  const path = require("path");
  const ecosystemFilePath = path.join(
    shipit.config.deployTo,
    "shared",
    "ecosystem.config.js"
  );

  // Our listeners and tasks will go here
  shipit.on("updated", async () => {
    shipit.start("npm-install");
  });

  shipit.on("installed", async () => {
    await shipit.start("npm-run-build");
  });

  shipit.on("copied", () => {
    shipit.start("copy-config");
  });

  shipit.on("copiedConfig", () => {
    shipit.start("pm2-server");
  });

  shipit.on("built", async () => {
    await shipit.start("copy-build");
  });

  shipit.blTask("copy-config", async () => {
    const fs = require("fs");
    const ecosystem = `
		module.exports = {
			apps: [
				{
					name: '${appName}',
					script: '${shipit.releasePath}/server.js',
					watch: true,
					autorestart: true,
					restart_delay: 1000,
					env: {
						NODE_ENV: 'development'
					},
					env_production: {
						NODE_ENV: 'production'
					}
				}
			]
		};`;
    try {
      fs.writeFileSync("ecosystem.config.js", ecosystem);

      console.log("File created successfully.");

      await shipit.copyToRemote("ecosystem.config.js", ecosystemFilePath);
      shipit.emit("copiedConfig");
    } catch (e) {
      console.log(e);
    }
  });

  shipit.blTask("npm-install", async () => {
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
    shipit.emit("installed");
  });

  shipit.blTask("npm-run-build", async () => {
    await shipit.local(`npm run build`);
    shipit.emit("built");
  });

  shipit.blTask("copy-build", async () => {
    await shipit.copyToRemote(".next", `${shipit.releasePath}`);
    shipit.emit("copied");
  });

  shipit.blTask("pm2-server", async () => {
    await shipit.remote(`pm2 delete -s ${appName} || :`);
    await shipit.remote(
      `cd ${shipit.releasePath} && pm2 start ${ecosystemFilePath} --env production --watch true`
    );
  });
};
