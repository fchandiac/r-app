import React, { useEffect, useState } from 'react'
import {
    AppBar, Container, Drawer, IconButton, Box, Divider, List, ListItem, ListItemButton, ListItemText,
    Typography, Dialog, DialogTitle, DialogContent, Button, Paper, Popover, Grid, TextField, DialogActions, CardMedia
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'

import { useRouter } from 'next/router'


import { useAppContext } from '../../appProvider'
import Snack from '../Karmextron/Snack/Snack'
import useUsers from '../Hooks/useUsers'




export default function Layout(props) {
    const { children } = props
    const users = useUsers()
    const { pageTitle, setPageTitle, user, openSnack } = useAppContext()
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
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        name='menuButton'
                        aria-label="Menu"
                        sx={{ mr: 2 }}
                        onClick={() => { setOpenDrawer(!openDrawer) }}
                    >
                        <MenuIcon />

                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {pageTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant={'subtitle2'} component="div" sx={{ flexGrow: 1 }}>
                            {user.name}
                        </Typography>
                        <IconButton
                            sx={{marginLeft:2}}
                            onClick={(e) => { setAnchorElPopOver(e.currentTarget) }}
                            color={'inherit'}
                        >
                            <AccountCircle />
                        </IconButton>
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
                        <Button variant={'outlined'} onClick={() => {
                            setAnchorElPopOver(null)
                            router.push({
                                pathname: '/',
                            })
                            setPageTitle('')

                        }}>Cerrar sesión</Button>
                    </Box>
                    <Box display={'flex'} paddingTop={1}>
                        <Button variant={'outlined'} size='small' onClick={() => {
                            setOpenChangePassDialog(true)

                        }}>Cambiar Contraseña</Button>
                    </Box>

                </Paper>
            </Popover>


            <Drawer
                anchor='left'
                open={openDrawer}
                onClick={() => { setOpenDrawer(!openDrawer) }}
            // sx={{backgroundColor:'rgba(158, 158, 158, 0.1)'}}
            >
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', padding: 1 }}>
                    <IconButton onClick={() => setOpenDrawer(false)} >
                        <ChevronLeft />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Decretos'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/decrees',
                                    })
                                    setPageTitle('Decretos')
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Distibución'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/distribution',
                                    })
                                    setPageTitle('Distibución')
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
{/* 
                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Correspondencía'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/mails',
                                    })
                                    setPageTitle('Correspondencía')
                                }}
                            />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Departamentos'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/departments',
                                    })
                                    setPageTitle('Departamentos')
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Destinatarios'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/recipients',
                                    })
                                    setPageTitle('Destinatarios')
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem
                        sx={{}}
                        disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'Usuarios'}
                                onClick={() => {
                                    router.push({
                                        pathname: '/users',
                                    })
                                    setPageTitle('Usuarios')
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

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
                                    onChange={(e) => { setChangePassData({ ...changePassData, newPass: e.target.value })}}
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

