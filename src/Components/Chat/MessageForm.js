import React from "react";
import Attachment from "./svg/Attachmet";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
    return (
        <form className="message_form" onSubmit={handleSubmit}>
            <label htmlFor="img">
                <Attachment />
            </label>
            <input
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id="img"
                accept="image/*"
                style={{ display: "none" }}
            />
            <div>
                <input
                    type="text"
                    placeholder="Escriba un mensaje"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <button className="btn send_message">Enviar</button>
            </div>
        </form>
    );
};

export default MessageForm;