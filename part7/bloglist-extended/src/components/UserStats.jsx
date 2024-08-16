import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

const UserStats = () => {
    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await userService.getAllUsers()
                setAllUsers(users)
            } catch (error) {
                console.error('Error fetching users:', error)
                setAllUsers([])
            }
        }
        fetchUsers()
    }, [])


    return (
        <div>
            {allUsers && 
                <>
                <h1> Users </h1>
                <Table striped> 
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                    {allUsers.map(user => {
                        return (
                            <tr key={user.id}>
                            <td> 
                                <a href="#" onClick={() => setSelectedUser(user)}>{user.name}</a>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                        )
                    })}
                </tbody>
                </Table>
                </>
            }
            {selectedUser &&
            <div>
                <h2>{selectedUser.name}</h2>
                <h4>Added blogs</h4>
                {selectedUser.blogs.length > 0 ? 
                <ul> {selectedUser.blogs.map( blog => (
                    <li key={blog.id}>{blog.title}</li>
                    ))
                    }
                </ul>
                : <div>No added blogs</div>
                }
            </div>
            }
        </div>
    )
}

export default UserStats

