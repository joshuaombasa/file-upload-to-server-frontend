import React from "react";

export default function Form() {

    const [formData, setFormData] = React.useState({
        userName: '',
        userImage: null,
    })

    function handleChange(event) {
        const {name, value, type, files} = event.target

        if (type === 'file') {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name] : files[0]
                }
            }) 
        } else {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        }

    }

    console.log(formData)

    function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData

        data.append("userName", formData.userName)
        data.append("userImage", formData.userImage)

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: data
        }).
            then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
                   type="text" 
                   id="username"
                   name="userName"
                   value={formData.userName}
                   onChange={handleChange}
            />
            <label htmlFor="userImage">User Image:</label>
            <input 
                   type="file"
                   id="userImage" 
                   name="userImage"
                   onChange={handleChange}
            />
            <button>Submit</button>
        </form>
        </>
    )
}