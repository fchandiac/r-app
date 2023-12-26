import React, { useState, useEffect } from 'react'
import AppDataGrid from '../../Karmextron/DataGrid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid'
import InfoIcon from '@mui/icons-material/Info'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import useDepartments from '../../Hooks/useDepartments'
import DepartmentsForm from '../../Forms/DepartmentsForm/DepartmentsForm'
import { set } from 'date-fns'


export default function DepartmentsGrid(props) {
    const { update } = props
    const departments = useDepartments()
    const [gridApiRef, setGridApiRef] = useState(null)
    const [rowData, setRowData] = useState(departments.dataDefault())
    const [departmentsList, setDepartmentsList] = useState([])
    const [openInfoDialog, setOpenInfoDialog] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const departments_ = await departments.findAll()
            setDepartmentsList(departments_)
        }
        fetch()
    }, [update])

    const afterUpdateSubmit = () => {
        gridApiRef.current.updateRows([{
            id: rowData.id,
            name: rowData.name,
        }])
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <strong>
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Ver"
                        onClick={() => {
                            setRowData({
                                rowId: params.id,
                                id: params.row.id,
                                name: params.row.name
                            })
                            setOpenInfoDialog(true)
                        }}
                    />
                </strong>
            )
        }
    ]



    return (
        <>
            <AppDataGrid title={'Departamentos'} rows={departmentsList} columns={columns} height='80vh' setGridApiRef={setGridApiRef} />

            <Dialog open={openInfoDialog} maxWidth={'xs'} fullWidth>
                <DialogTitle sx={{ padding: 2 }}>Información del Departamento</DialogTitle>
                <DialogContent sx={{ padding: 1 }}>
                    <DepartmentsForm
                        edit={true}
                        departmentData={rowData}
                        setDepartmentdata={setRowData}
                        closeDialog={() => { setOpenInfoDialog(false) }}
                        afterSubmit={() => { afterUpdateSubmit() }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
