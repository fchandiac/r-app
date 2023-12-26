import React, { useState, useEffect } from 'react'
import AppDataGrid from '../../Karmextron/DataGrid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import useRecipients from '../../Hooks/useRecipients'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'



export default function RecipientsGrid(props) {
  const { update } = props
  const recipients = useRecipients()
  const [gridApiRef, setGridApiRef] = useState(null)
  const [rowData, setRowData] = useState(recipients.dataDefault())
  const [recipientsList, setRecipientsList] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const recipients_ = await recipients.findAllToGrid()
      setRecipientsList(recipients_)
      console.log(recipients_)
    }
    fetch()
  }, [update])

  const columns = [
    { field: 'id', headerName: 'Id', flex: .5 },
    { field: 'name', headerName: 'Nombre', flex: 1.5 },
    { field: 'departmentName', headerName: 'Departamento', flex: .5 },
    { field: 'userName', headerName: 'Usuario', flex: 1 },
    {
      field: 'repository', headerName: 'Repositorio', flex: .5, renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', textAlign:'center'}}>
          {params.value ? <CheckCircleIcon color={'success'} /> : <CancelIcon color={'error'} />}
        </Box>
      )
    },
    { field: 'url_repository', headerName: 'Url Repositorio', flex: 1 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <strong>
          <GridActionsCellItem
            icon={<InfoIcon />}
            label="Ver"
            onClick={() => { }}
          />
        </strong>
      )
    }
  ]

  return (
    <>
      <AppDataGrid title={'Destinatarios'} rows={recipientsList} columns={columns} height='80vh' setGridApiRef={setGridApiRef} />
    </>
  )
}
