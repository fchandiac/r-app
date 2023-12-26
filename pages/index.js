
import React, {useEffect, useState} from 'react'
import { Dialog, Box, Grid, TextField, DialogContent, DialogActions, Button } from '@mui/material'
import { useAppContext } from '../appProvider'
import useUsers from '../components/Hooks/useUsers'
import { useRouter } from 'next/router'




export default function index() {
  const { openSnack, closeSnack, setUser, setPageTitle } = useAppContext()
  const users = useUsers()
  const router = useRouter()
  const [userData, setUserData] = useState({user:'',pass:''})

  const login = async () => {
    const findUser = await users.login(userData.user, userData.pass)
    if (!findUser) {
      openSnack('Usuario no registrado o contraseña incorrecta', 'error')
      return false
    } else {
      setUser(findUser)
      setPageTitle('Mis carpetas')
      router.push('/folders')
      console.log(findUser)

    }
  }
  
  return (
    <>

      <Dialog open={true} maxWidth={'xs'} fullWidth
        BackdropProps={{
          sx: { backgroundColor: '#AAB4C9' },
        }}
      // PaperProps={{
      //   sx: { boxShadow: '0px 20px 300px rgba(0, 0, 0, 0.6)' },
      // }}
      >

        <form onSubmit={(e) => { e.preventDefault(); login() }}>
          <DialogContent sx={{ p: 2 }}>
         
            <Grid container spacing={1} direction={'column'}>
              <Grid item marginTop={1}>
                <TextField
                  label="Usuario"
                  value={userData.user}
                  onChange={(e) => setUserData({ ...userData, user: e.target.value })}
                  variant="outlined"
                  size={'small'}
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Contraseña"
                  value={userData.pass}
                  onChange={(e) => setUserData({ ...userData, pass: e.target.value })}
                  variant="outlined"
                  type='password'
                  size={'small'}
                  fullWidth
                  required
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button variant={'contained'} type={'submit'}>ingresar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
