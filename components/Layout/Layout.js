import React, { useEffect, useState } from 'react'
import {
    AppBar, Container, Drawer, IconButton, Box, Divider, List, ListItem, ListItemButton, ListItemText,
    Typography, Dialog, DialogTitle, DialogContent, Button, Paper, Popover, Grid, TextField, DialogActions, CardMedia, Stack
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'



import { useRouter } from 'next/router'


import { useAppContext } from '../../appProvider'
import Snack from '../Karmextron/Snack/Snack'
import useUsers from '../Hooks/useUsers'
import RefreshIcon from '@mui/icons-material/Refresh'



const config= require('../../config.js')
const server_url = config.serverUrl





export default function Layout(props) {
    const { children } = props
    const users = useUsers()
    const { pageTitle, setPageTitle, user, openSnack, update_folders, setUpdateFolders } = useAppContext()
    const router = useRouter()
    const [openDrawer, setOpenDrawer] = useState()
    const [anchorElPopOver, setAnchorElPopOver] = useState(null)
    const [openChangePassDialog, setOpenChangePassDialog] = useState(false)
    const [changePassData, setChangePassData] = useState({ oldPass: '', newPass: '', confirmPass: '' })



    const openUserInfo = Boolean(anchorElPopOver)
    const id = openUserInfo ? 'simple-popover' : undefined

    const changePass = async () => {

        const findUser = await users.findOneById(user.id)
        console.log(findUser)
        if (!findUser) {
            return false
        } else {
            if (findUser.pass !== changePassData.oldPass) {
                openSnack('Contraseña incorrecta', 'error')
                return false
            } else {
                if (changePassData.newPass !== changePassData.confirmPass) {
                    openSnack('Las contraseñas no coinciden', 'error')
                    return false
                } else {
                    const updatePass = await users.updatePass(user.id, changePassData.newPass)
                    if (updatePass) {
                        openSnack('Contraseña actualizada', 'success')
                        setOpenChangePassDialog(false)
                        router.push({
                            pathname: '/',
                        })
                        setPageTitle('')
                    } else {
                        openSnack('Error al actualizar contraseña', 'error')
                    }
                }
            }
        }
    }

    //sx={{ display: router.pathname == '/' ? 'none' : 'block' }}

    return (
        <>
            <AppBar name="appBar" >
                <Container sx={{ display: 'flex', alignItems: 'center', paddingTop: '0.3rem', paddingBottom: '0.3rem' }}>
                    <Box paddingTop={1} marginRight={3}>
                        <Typography variant="body">Sistema de Gestión Documental</Typography>
                        <br />
                        <Typography variant="caption">Distribución v1.0.3</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem style={{ backgroundColor: 'white', height: 'auto', width: 2, marginRight: 15, marginTop: 3, marginBottom: 3 }} />

                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        {pageTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant={'subtitle2'} component="div" sx={{ flexGrow: 1 }}>
                            {user.name}
                        </Typography>
                        <IconButton
                            sx={{ marginLeft: 2 }}
                            onClick={(e) => { setAnchorElPopOver(e.currentTarget) }}
                            color={'inherit'}
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            name='menuButton'
                            aria-label="Menu"
                            onClick={() => {
                                console.log('Update folders', update_folders)
                                setUpdateFolders(!update_folders)
                            }}
                        >

                            <RefreshIcon />
                        </IconButton>
                        <Button
                            sx={{ marginLeft: 2, marginRight: 5 }}
                            color='inherit'
                            variant='outlined'
                            onClick={() => { router.push({ pathname: '/' }) }}
                            size='small'
                        >Salir</Button>

                        <CardMedia
                            component="img"
                            image={server_url + '/logo-white.png'}
                            alt="logo"
                            sx={{ width: '48px' }}
                        />


                    </Box>

                </Container>
            </AppBar>
            <Popover
                id={id}
                open={openUserInfo}
                anchorEl={anchorElPopOver}
                onClose={() => { setAnchorElPopOver(null) }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Paper sx={{ p: 1 }}>
                    <Typography variant={'caption'} fontWeight="bold">{user.user}</Typography>
                    <Divider />
                    <Box flexDirection={'column'} paddingTop={1} paddingBottom={1}>
                        <Typography fontSize={10}>{'Nombre: ' + user.name}</Typography>
                        <Typography fontSize={10}>{'Perfil: ' + user.Profile.name}</Typography>
                    </Box>
                    <Divider />

                    <Box display={'flex'} paddingTop={1}>
                        <Button variant={'outlined'} size='small' onClick={() => {
                            setOpenChangePassDialog(true)

                        }}>Cambiar Contraseña</Button>
                    </Box>

                </Paper>
            </Popover>


            <Dialog open={openChangePassDialog} maxWidth={'xs'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Cambiar contraseña</DialogTitle>
                <form onSubmit={(e) => { e.preventDefault(); changePass() }}>
                    <DialogContent sx={{ padding: 1 }}>
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item marginTop={1}>
                                <TextField
                                    label="Contraseña actual"
                                    type='password'
                                    value={changePassData.oldPass}
                                    onChange={(e) => { setChangePassData({ ...changePassData, oldPass: e.target.value }) }}
                                    variant="outlined"
                                    size={'small'}
                                    fullWidth
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Nueva contraseña"
                                    value={changePassData.newPass}
                                    onChange={(e) => { setChangePassData({ ...changePassData, newPass: e.target.value }) }}
                                    variant="outlined"
                                    type='password'
                                    size={'small'}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Confirmar contraseña"
                                    value={changePassData.confirmPass}
                                    onChange={(e) => { setChangePassData({ ...changePassData, confirmPass: e.target.value }) }}
                                    variant="outlined"
                                    type='password'
                                    size={'small'}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item textAlign={'right'}>
                                <Button variant='contained' type='submit'>Guardar</Button>
                                <Button variant='outlined' sx={{ marginLeft: 1 }} onClick={() => { setOpenChangePassDialog(false) }}>Cerrar</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>


                </form>

            </Dialog>



            <Snack />


            {/* Children */}
            {children}
        </>
    )
}

