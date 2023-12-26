import { Grid, TextField, Button } from '@mui/material'
import React from 'react'
import useDecreescategories from '../../Hooks/useDecreescategories'




export default function DecreesCategoriesForm(props) {
    const { categorieData, setCategoriesData, mode, closeDialog, afterSubmit } = props
    const categories = useDecreescategories()

    const saveCategorie = async () => {
        if (mode === 'edit') {
            const updateCategorie = await categories.update(categorieData.id, categorieData.name)
            afterSubmit()
            closeDialog()
        } else if (mode === 'new') {
            const newCategorie = await categories.create(categorieData.name)
            setCategoriesData(categories.dataDefault())
            afterSubmit()

        } else if (mode === 'delete') {
            console.log('delete')
        }
    }


    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); saveCategorie() }}>
                <Grid container spacing={1} direction={'column'}>
                    <Grid item marginTop={1}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={categorieData.name}
                            size='small'
                            onChange={(e) => setCategoriesData({ ...categorieData, name: e.target.value })}
                            required
                        />
                    </Grid>

                    <Grid item textAlign={'right'}>
                        <Button variant='contained' color='primary' type='submit'
                        >
                            {mode == 'edit' ? 'Actualizar' : 'Guardar'}
                        </Button>
                        <Button
                            variant='outlined'
                            sx={{
                                display: mode == 'edit' ? 'inline-block' : 'none',
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
