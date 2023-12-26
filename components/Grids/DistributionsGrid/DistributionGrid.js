import useDistributions from '@/components/Hooks/useDistributions'
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Stack } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useAppContext } from '@/appProvider'
const config= require('../../../config.js')
const server_url = config.serverUrl




export default function DistributionGrid(props) {
    const { recipient_id, updateFolder, closeDialog } = props
    const { user } = useAppContext()
    const distributions = useDistributions()
    const [distributionsList, setDistributionsList] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const dist = await distributions.findAllToGrid(recipient_id)
            dist.sort((a, b) => b.folio - a.folio)
            console.log(dist)
            
            setDistributionsList(dist)
            if (dist.length == 0){
                updateFolder()
                closeDialog()
            }
        }
        fetch()
    }, [update])

    const openPdf = (url) => {
        const pdfUrl = server_url + 'pdfjs-4.0.269-dist/web/viewer.html?file=' + url
        window.open(pdfUrl, '_blank')
    }

    const updateStatus = async (distribution_id) => {
        await distributions.updateStatus(distribution_id, user.id)
        setUpdate(!update)
    }



    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Año</TableCell>
                            <TableCell>Folio</TableCell>
                            <TableCell>Documento</TableCell>
                            <TableCell>Materia</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {distributionsList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>{row.folio}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.matter}</TableCell>
                                <TableCell>{moment(row.date).format('DD-MM-YYYY')}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton color="primary"
                                            onClick={() => openPdf(row.url)}
                                        >
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                        <IconButton color="primary"
                                            onClick={() => updateStatus(row.distribution_id)}
                                        >
                                            <ArchiveIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
