import { Grid, TextField, Button, Autocomplete, FormControlLabel, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useUsers from '../../Hooks/useUsers'
import useDepartments from '../../Hooks/useDepartments'
import useRecipients from '../../Hooks/useRecipients'
import { useAppContext } from '@/appProvider'





export default function RecipientsForm(props) {
    const { recipientData, setRecipientdata, edit, closeDialog, afterSubmit } = props
    const users = useUsers()
    const { user, update_folders, setUpdateFolders } = useAppContext()
    const departments = useDepartments()
    const recipients = useRecipients()
    const [usersOptions, setUsersOptions] = useState([])
    const [departmentsOptions, setDepartmentsOptions] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const users_ = await users.findAllRecipients()
            setUsersOptions(users_)
            const departments_ = await departments.findAllToAutocomplete()
            setDepartmentsOptions(departments_)
        }

        fetch()

    }, [])

    const saveRecipient = async (e) => {
  
        console.log('recipientData', recipientData)

        const newRecipient = await recipients.create(
            recipientData.name,
            false,
            '',
            recipientData.Department.id,
            user.id
        )
        setRecipientdata(recipients.dataDefault())
        setUpdateFolders(!update_folders)
        closeDialog()


    }


    return (
        <>
         
                <Grid container spacing={1} direction={'column'}>

                    <Grid item >
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            value={recipientData.name}
                            onChange={(e) => setRecipientdata({ ...recipientData, name: e.target.value })}
                            required
                            size='small'
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <Autocomplete
                            id="departments"
                            value={recipientData.Department}
                            options={departmentsOptions}
                            getOptionLabel={(option) => option.name}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setRecipientdata({ ...recipientData, Department: newValue })
                                }

                            }}
                            renderInput={(params) => <TextField {...params} label="Departamento" fullWidth size='small' required />}
                        />
                    </Grid>

                    <Grid item textAlign={'right'}>
                        <Button variant='contained' color='primary'
                            onClick={(e) => { saveRecipient() }}
                        >guardar</Button>
                        <Button
                            variant='outlined'
                            sx={{

                                marginLeft: 1
                            }}
                            onClick={() => { closeDialog() }}

                        >Cerrar</Button>
                    </Grid>

                </Grid>
      
        </>
    )
}
