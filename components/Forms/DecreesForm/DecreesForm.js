import React, { useState, useEffect } from 'react'

import { useAppContext } from '../../../appProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import {
    Autocomplete, Button, Grid, IconButton, Stack, TextField,
    Table, TableBody, TableCell, TableContainer, TableRow, Paper, ButtonGroup, Typography, TableHead
} from '@mui/material'
import useDecreescategories from '../../Hooks/useDecreescategories'
import useDepartments from '../../Hooks/useDepartments'
import useRecipients from '../../Hooks/useRecipients'
import useAttachments from '../../Hooks/useAttachments'
import useDecrees from '../../Hooks/useDecrees'
import useDistributions from '../../Hooks/useDistributions'


import moment from 'moment'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import ClearIcon from '@mui/icons-material/Clear'




export default function DecreesForm(props) {
    const { onClose, afterSubmit, mode, decreeData, setDecreeData } = props
    const { openSnack, user } = useAppContext()
    const categories = useDecreescategories()
    const departments = useDepartments()
    const recipients = useRecipients()
    const attachments = useAttachments()
    const decrees = useDecrees()
    const distributions = useDistributions()
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [departmentsOptions, setDepartmentsOptions] = useState([])
    const [recipientsOptions, setRecipientsOptions] = useState([])
    const [recipientData, setRecipientData] = useState({ id: 0, key: 0, name: '' })
    const [recipientsList, setRecipientsList] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const categories_ = await categories.findAllToAutocomplete()
            if (mode === 'new') {
                const filterCategories = categories_.filter(category => category.id > 1002)
                setCategoriesOptions(filterCategories)
            } else if (mode === 'edit') {
                const filterCategories = categories_.filter(category => category.id == 1002)
                setCategoriesOptions(filterCategories)
            } else if (mode === 'delete') {
                const filterCategories = categories_.filter(category => category.id == 1001)
                setCategoriesOptions(filterCategories)
            }
            const departments_ = await departments.findAllToAutocomplete()
            setDepartmentsOptions(departments_)
            const recipients_ = await recipients.findAllToAutocomplete()
            setRecipientsOptions(recipients_)
        }
        fetch()
    }, [])


    const typeOptions = [
        { id: 1, key: 1, name: 'Exento' },
        { id: 2, key: 2, name: 'Alcaldicio' },
        { id: 3, key: 3, name: 'Siaper' },
    ]

    const saveDecree = async () => {
        if (recipientsList.length === 0) {
            openSnack('Debe agregar al menos un destinatario', 'error')
            return
        }

        let newAttachmentId = null
        if (decreeData.file !== null) {
            const upload = await attachments.upload(decreeData.file)
            let url = attachments.serverUrl() + upload.filename
            const newAttachment = await attachments.create(url)
            newAttachmentId = newAttachment.data.id
        } else {
            console.log('no hay archivo')
        }

        const newDecree = await decrees.create(
            decreeData.type.id,
            decreeData.matter,
            decreeData.date,
            newAttachmentId,
            decreeData.category.id,
            decreeData.department.id,
            1001
        )

        recipientsList.forEach(async (recipient) => {
            await distributions.create(0, newDecree.id, recipient.id, 1001, false)
            console.log('recipient', recipient)
        })
        // const newAttachment = await attachments.create(uploadFile.p)

        console.log(newDecree)
        onClose()
        afterSubmit()
    }

    const deleteRecipient = (id) => {
        const recipientsList_ = recipientsList.filter(recipient => recipient.id !== id)
        setRecipientsList(recipientsList_)
    }

    const RecipientsTable = ({ recipients, onDelete }) => {
        return (
            <Paper variant={'outlined'}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {recipients.map((recipient) => (
                            <TableRow
                                sx={{
                                    width: 'fit-content'
                                }}
                                key={recipient.id}>
                                <TableCell>{recipient.name}</TableCell>
                                <TableCell>{recipient.key}</TableCell>
                                <TableCell sx={{ width: '20%' }}>
                                    <IconButton
                                        onClick={() => onDelete(recipient.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Paper>
        )
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); saveDecree() }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item>
                                <StaticDatePicker
                                    componentsProps={{ actionBar: { actions: [] } }}
                                    label="Fecha del Documento"
                                    value={decreeData.date}
                                    onChange={(newValue) => { setDecreeData({ ...decreeData, date: moment(newValue) }) }}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    id="type"
                                    options={typeOptions}
                                    value={decreeData.type}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setDecreeData({ ...decreeData, type: newValue })
                                        }
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Tipo" fullWidth size='small' required />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    id="category"
                                    options={categoriesOptions}
                                    value={decreeData.category}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setDecreeData({ ...decreeData, category: newValue })
                                        }
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Categoría" fullWidth size='small' required />}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    id="department"
                                    options={departmentsOptions}
                                    value={decreeData.department}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setDecreeData({ ...decreeData, department: newValue })
                                        }
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => <TextField {...params} label="Departamento" fullWidth size='small' required />}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1} direction={'column'}>
                            <Grid item marginTop={5}>
                                <TextField
                                    fullWidth
                                    label="Materia"
                                    value={decreeData.matter}
                                    multiline
                                    rows={9}
                                    size='small'
                                    onChange={(e) => setDecreeData({ ...decreeData, matter: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={1} alignItems={'stretch'}>
                                    <Autocomplete
                                        sx={{ flexGrow: 1 }}
                                        id="recipient"
                                        options={recipientsOptions}
                                        value={recipientData}
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                setRecipientData(newValue)
                                            }
                                        }}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label="Destinatario" fullWidth size='small' />}
                                    />
                                    <IconButton
                                        onClick={() => {
                                            if (recipientData.id === 0) return
                                            let findRecipient = recipientsList.find(recipient => recipient.id === recipientData.id)
                                            if (findRecipient) return
                                            setRecipientsList([...recipientsList, recipientData])
                                            setRecipientData({ id: 0, key: 0, name: '' })

                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item display={recipientsList.length == 0 ? 'none' : 'block'}>
                                <RecipientsTable recipients={recipientsList} onDelete={deleteRecipient} />
                            </Grid>
                            <Grid item display={'none'}>
                                <Stack direction="row" spacing={1} alignItems="center">

                                    <ButtonGroup >
                                        <Button
                                            variant='contained'
                                            component="label"
                                            startIcon={<AttachFileIcon />}

                                        >
                                            Adjuntar
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    let file = e.target.files[0]
                                                    setDecreeData({ ...decreeData, file: file })


                                                }}
                                                hidden
                                            />
                                        </Button>
                                        <Button
                                            variant='contained'
                                            component="label"
                                            size='small'
                                            onClick={() => { setDecreeData({ ...decreeData, file: null }) }}

                                        >
                                            <ClearIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography variant={'inherit'} component='div'>
                                        {decreeData.file ? decreeData.file.name : 'Seleccione un archivo'}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item
                                //{mode === 'delete'  or  mode === 'edit'  ? 'block' : 'none'}
                                display={mode === 'delete' || mode === 'edit' ? 'inline-block' : 'none'}
                            >
                                <Paper variant="outlined" sx={{ p: 1 }}>
                                    <Typography variant={'subtitle1'}>
                                        Decreto de Referencía
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" marginTop={1}>
                                        <TextField
                                            fullWidth
                                            label="folio"
                                            value={decreeData.destroyFolio}
                                            size='small'
                                            required
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="año"
                                            value={decreeData.destroyYear}
                                            size='small'
                                            required
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} textAlign={'right'} marginTop={1}>
                            <Button variant='contained' color='primary' type='submit'>Guardar</Button>
                            <Button sx={{ marginLeft: 1 }} variant='outlined' color='secondary' onClick={() => { onClose() }}>cerrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        </>
    )
}


function decreeDataDefault() {
    return ({
        id: 0,
        date: new Date(),
        matter: '',
        type: { id: 0, key: 0, name: '' },
        category: { id: 0, key: 0, name: '' },
        department: { id: 0, key: 0, name: '' },
        userId: 0,
        file: null


    })
}

function rowDataDefault() {
    return ({
        rowId: 0,
        id: 0,
        type: 0,
        matter: '',
        date: '',
        Attachment: '',
        attachmentId: '',
        attachmentUrl: '',
        categoryName: '',
        departmentName: '',
        userName: '',
        userId: '',
        referenceId: 0,
    })
}