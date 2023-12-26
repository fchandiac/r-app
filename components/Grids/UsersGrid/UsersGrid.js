import React, { useState, useEffect } from 'react'
import useUsers from '../../Hooks/useUsers'
import AppDataGrid from '../../Karmextron/DataGrid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import UsersForm from '../../Forms/UsersForm/UsersForm'


export default function UsersGrid(props) {
  const { update } = props
  const [gridApiRef, setGridApiRef] = useState(null)
  const users = useUsers()
  const [usersList, setUsersList] = useState([])
  const [openInfoDialog, setOpenInfoDialog] = useState(false)
  const [rowData, setRowData] = useState(users.dataDefault())

  useEffect(() => {
    const fecth = async () => {
      const users_ = await users.findAllToGrid()
      setUsersList(users_)
    }
    fecth()
  }, [update])

  const afterInfoSubmit = () => {
    gridApiRef.current.updateRows([{
        id: rowData.id,
        name: rowData.name,
        profileId: rowData.Profile.id,
        profileName: rowData.Profile.name,
      }])
}



  const columns = [
    { field: 'id', headerName: 'Id', flex: .5 },
    { field: 'userName', headerName: 'Nombbre de usuario', flex: 1 },
    { field: 'name', headerName: 'Nombre', flex: 1.5 },
    { field: 'profileName', headerName: 'Perfil', flex: 1 },
    {
      field: 'actions',
      headerName: '',
      headerClassName: 'data-grid-last-column-header',
      type: 'actions', flex: .5, getActions: (params) => [
        <GridActionsCellItem
          label='info'
          icon={<InfoIcon />}
          onClick={() => {
            setRowData({
              rowId: params.id,
              id: params.row.id,
              userName: params.row.userName,
              profileId: params.row.profileId,
              profileName: params.row.profileName,
              Profile: { id: params.row.profileId, key: params.row.profileId, name: params.row.profileName },
              name: params.row.name,
              pass: params.row.pass
            })
            setOpenInfoDialog(true)
          }}
        />,
      ]
    },
  ]

  return (
    <>
      <AppDataGrid title={'Usuarios'} rows={usersList} columns={columns} height='80vh' setGridApiRef={setGridApiRef} />
      <Dialog open={openInfoDialog} maxWidth={'xs'} fullWidth>
        <DialogTitle sx={{ padding: 2 }}>Información de usuario</DialogTitle>
        <DialogContent sx={{ padding: 1 }}>
          <UsersForm
            edit={true}
            closeDialog={() => { setOpenInfoDialog(false) }}
            userData={rowData}
            setUserData={setRowData}
            afterSubmit={() => { afterInfoSubmit() }}
          />

        </DialogContent>
      </Dialog>
    </>
  )
}
