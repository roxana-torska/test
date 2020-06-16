import React from 'react'
import { AddCircleRounded, CancelRounded, CheckCircleOutlineRounded } from "@material-ui/icons";

export default function ReviewTags(props) {
    const {
        showInput,
        showInputField,
        tags,
        handleDelete,
        closeInput,
        value,
        handleChange,
        handleSubmit,
        classes
    } = props
    return (
        <div style={{
            marginTop: "10px",
        }}>
            {tags.map((rec, index) => <React.Fragment key={index}><div style={{
                display: "inline",
                backgroundColor: "#F9867E",
                verticalAlign: "top",
                height: "24px",
                fontSize: "13px",
                color: "white",
                borderRadius: "15px",
                padding: "3px 10px 5px 10px",
            }} key={index}>
                {rec} <span
                    onClick={() => handleDelete(index)}
                    key={index}
                    style={{
                        marginLeft: "5px",
                        cursor: "pointer",

                    }}>X</span>
            </div>

            </React.Fragment>
            )}
            {!showInput && < div
                style={{

                    marginTop: "10px",
                    display: "inline",
                    marginLeft: "10px",

                }}
            >
                <span
                    onClick={showInputField}
                    style={{
                        width: "30px",
                        height: "30px",
                        verticalAlign: "top",

                    }}>
                    <AddCircleRounded className={classes.reviewIconColor} />
                </span>
            </div>}
            {showInput && <React.Fragment>

                <input type="text"
                    value={value}
                    onChange={handleChange}
                    style={{
                        border: "1px solid #F9867E",
                        height: "24px",
                        fontSize: "13px",
                        width: "57px",
                        borderRadius: "15px",
                        padding: "5px",
                    }}
                /> <div style={{
                    display: "inline",
                    marginTop: "20px",
                    verticalAlign: "top",
                }}>
                    <CheckCircleOutlineRounded onClick={handleSubmit} className={classes.reviewIconColor} />
                    <CancelRounded onClick={closeInput}
                        className={classes.reviewIconColor} />
                </div>
            </React.Fragment>}
        </div>
    )
}