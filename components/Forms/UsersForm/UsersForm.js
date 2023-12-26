import { Grid, Autocomplete, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useProfiles from '../../Hooks/useProfiles'
import useUsers from '../../Hooks/useUsers'
import { useAppContext } from '../../../appProvider'






export default function UsersForm(props) {
    const { userData, setUserData, edit, afterSubmit, closeDialog } = props
    const { openSnack } = useAppContext()
    const profiles = useProfiles()
    const users = useUsers()
    const [profilesOptions, setProfilesOptions] = useState([])
 

    useEffect(() => {
        const fecth = async () => {
            const profiles_ = await profiles.findAllToAutocomplete()
            setProfilesOptions(profiles_)
        }

        fecth()

    }, [])




    const saveUser = async () => {
        if (edit) {
            const updatedUser = await users.update(userData.id, userData.userName, userData.name, userData.Profile.id)
            afterSubmit()
            closeDialog()

        } else {
            try {
                const newUser = await users.create(userData.userName, userData.name, userData.Profile.id)
                afterSubmit()
            } catch (err) {
                if(err.message === 'user_name must be unique'){
                    openSnack('El nombre de usuario ya existe','error')
                }
            }

        }
    }
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); saveUser() }}>
                <Grid container spacing={1} direction={'column'}>
                    <Grid item marginTop={1}>
                        <TextField
                            disabled= {edit}
                            label="Nombre de usuario"
                            value={userData.userName}
                            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                            variant="outlined"
                            size={'small'}
                            fullWidth
                            required
                            autoFocus
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label='nombre'
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            variant="outlined"
                            size={'small'}
                            fullWidth
                            required

                        />
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            id="profiles"
                            value={userData.Profile}
                            options={profilesOptions}
                            getOptionLabel={(option) => option.name}
                            onChange={async (event, newValue) => {
                                if (newValue) {
                                    setUserData({ ...userData, Profile: newValue })
                                }

                            }}
                            renderInput={(params) => <TextField {...params} label="Perfil" fullWidth size='small' />}
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
                            display: edit? 'inline-block': 'none',
                            marginLeft: 1
                        }}
                        onClick={() => {closeDialog()}}

                         >Cerrar</Button>
                    </Grid>

                </Grid>
            </form>

        </>
    )
}
