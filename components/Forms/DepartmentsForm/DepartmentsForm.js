import { Grid, TextField, Button } from '@mui/material';
import React, {useEffect, useState} from 'react'
import useDepartments from '../../Hooks/useDepartments'


export default function DepartmentsForm(props) {
  const { departmentData, setDepartmentdata, edit, closeDialog, afterSubmit } = props
  const departments = useDepartments()
  

  const saveDepartment = async () => {
    if (edit) {
      const updatedDepartment = await departments.update(departmentData.id, departmentData.name)
      console.log(updatedDepartment)
      // afterSubmit()
      closeDialog()
      afterSubmit()
    } else {
      console.log(departmentData)
      const newDepartment = await departments.create(departmentData.name)
      setDepartmentdata(departments.dataDefault())
      afterSubmit()
    }
  }

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); saveDepartment() }}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item marginTop={1}>
            <TextField
              label="Nombre"
              variant="outlined"
              value={departmentData.name}
              onChange={(e) => setDepartmentdata({ ...departmentData, name: e.target.value })}
              required
              size='small'
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
