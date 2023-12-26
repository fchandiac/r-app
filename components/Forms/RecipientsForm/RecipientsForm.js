import { Grid, TextField, Button, Autocomplete, FormControlLabel, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useUsers from '../../Hooks/useUsers'
import useDepartments from '../../Hooks/useDepartments'
import useRecipients from '../../Hooks/useRecipients'




export default function RecipientsForm(props) {
    const { recipientData, setRecipientdata, edit, closeDialog, afterSubmit } = props
    const users = useUsers()
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

    const saveRecipient = async () => {
        if (edit) {
            // closeDialog()
            console.log(recipientData)
        } else {
           const newRecipient = await recipients.create(
            recipientData.name,
            recipientData.repository,
            recipientData.url_repository,
            recipientData.Department.id,
            recipientData.User.id
           )
            setRecipientdata(recipients.dataDefault())

            afterSubmit()
        }
    }


    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); saveRecipient() }}>
                <Grid container spacing={1} direction={'column'}>
                <Grid item marginTop={1}>
                        <Autocomplete
                            id="users"
                            value={recipientData.User}
                            options={usersOptions}
                            getOptionLabel={(option) => option.name}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setRecipientdata({ ...recipientData, User: newValue, name: newValue.name })
                                    
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Usuario" fullWidth size='small' />}
                        />

                    </Grid>
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
                    <Grid item>
                        <FormControlLabel control={
                        <Switch
                         checked={recipientData.repository}
                         onChange={(e) => setRecipientdata({ ...recipientData, repository: e.target.checked })}
                          />
                        } label="Repositorio" />

                    </Grid>
                    <Grid item>
                        <TextField
    
                            sx={{ display: recipientData.repository ? 'block' : 'none' }}
                            label='Url repositorio'
                            value={recipientData.url_repository}
                            onChange={(e) => setRecipientdata({ ...recipientData, url_repository: e.target.value })}
                            variant="outlined"
                            size={'small'}
                            fullWidth
                        />
                    </Grid>
                    <Grid item textAlign={'right'}>
                        <Button variant='contained' color='primary' type='submit'
                        >
                            {edit ? 'Actualizar' : 'Guardar'}
                        </Button>
                        <Button
                            variant='outlined'
                            sx={{
                                display: edit ? 'inline-block' : 'none',
                                marginLeft: 1
                            }}
                            onClick={() => { closeDialog() }}

                        >Cerrar</Button>
                    </Grid>

                </Grid>
            </form>
        </>
    )
}
