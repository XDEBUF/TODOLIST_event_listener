import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");
    function handleChange(e) {
        setName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }
// Plus bas vers l'instruction return
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Qu'y a-t-il à faire&nbsp;?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Ajouter
            </button>
        </form>
    );
}

export default Form;
