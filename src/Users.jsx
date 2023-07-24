import React from "react";

import ImageComponent from "./ImageComponent";

export default function Users() {

    const [usersData, setUsersData] = React.useState(null)

    let usersJsx

    if (usersData) {
        usersJsx = usersData.map(item => (
            <div key={item.user_id}>
                <h3>{item.username}</h3>
                <ImageComponent  filename={item.filename} />
            </div>
        )
        )
    }

    function getUsers() {
        fetch('http://localhost:3000/users')
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setUsersData(data)
          })
    }

    return (
        <div className="users--container">
            <button onClick={getUsers}>
                Get users
            </button>
            {usersData && usersJsx}
        </div>
    )
}

// (<a key={item.user_id} href={`http://localhost:3000/uploads/${item.filename}`}>{item.username}</a>)