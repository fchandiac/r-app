import React, { useState, useEffect } from 'react'
import AppDataGrid from '../../Karmextron/DataGrid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material'
import useDecreescategories from '../../Hooks/useDecreescategories'
import DecreesCategoriesForm from '../../Forms/DecreesCategoriesForm'




export default function DecreesCategoriesGrid(props) {
    const { update } = props
    const decreescategories = useDecreescategories()
    const [gridApiRef, setGridApiRef] = useState(null)
    const [rowData, setRowData] = useState(decreescategories.dataDefault())
    const [decreescategoriesList, setDecreesCategoriesList] = useState([])
    const [openInfoDialog, setOpenInfoDialog] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const decreescategories_ = await decreescategories.findAll()
            setDecreesCategoriesList(decreescategories_)
        }
        fetch()
    }, [update])

    const afterInfoSubmit = () => {
        gridApiRef.current.updateRows([{
            id: rowData.id,
            name: rowData.name,
          }])
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: .5 },
        { field: 'name', headerName: 'Nombre', flex: 1.5 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <GridActionsCellItem
                    //or
                    sx={{display: params.row.id == 1001 || params.row.id == 1002 ? 'none' : 'inline-block' }}
                    icon={<InfoIcon />}
                    label="Ver"
                    onClick={() => {
                        setRowData({
                            rowId: params.id,
                            id: params.row.id,
                            name: params.row.name,
                        })
                        setOpenInfoDialog(true)
                     }}
                />
            )
        }
    ]
    return (
        <>
            <AppDataGrid title={'Categorías de Decretos'} rows={decreescategoriesList} columns={columns} height='80vh' setGridApiRef={setGridApiRef} />

            <Dialog open={openInfoDialog} maxWidth={'xs'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Información de Categoría</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <DecreesCategoriesForm
                        categorieData={rowData}
                        setCategoriesData={setRowData}
                        mode={'edit'}
                        closeDialog={() => { setOpenInfoDialog(false) }}
                        afterSubmit={() => { afterInfoSubmit() }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
