import React from 'react'
import { Grid, TextField, Button} from '@mui/material'

export default function MailsReferencesForm(props) {
  const { referenceData, setReferenceData, edit, closeDialog, afterSubmit } = props

  const saveReference = async () => {

  }
  return (
     <>
            <form onSubmit={(e) => { e.preventDefault(); saveReference() }}>
                <Grid container spacing={1} direction={'column'}>
                    <Grid item marginTop={1}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={referenceData.name}
                            size='small'
                            onChange={(e) => setCategoriesData({ ...categorieData, name: e.target.value })}
                            required
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
