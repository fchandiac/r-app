import useDistributions from '@/components/Hooks/useDistributions'
import useRecipients from '@/components/Hooks/useRecipients'
import { Table, TableHead, TableRow, TableContainer, TableCell, TableBody, TableFooter, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import moment from 'moment'
const ExcelJS = require('exceljs')



export default function TransparencyGrid(props) {
    const { recipient_id, closeDialog } = props
    const [decreesList, setDecreesList] = useState([])
    const recipients = useRecipients()
    const distributions = useDistributions()

    useEffect(() => {
        const fetch = async () => {
            const decrees_ = await distributions.findAllToTransparencyGrid(recipient_id)
            console.log('TRANPARENCY LIST', decrees_)
            setDecreesList(decrees_)
        }
        fetch()
    }, [])

    const headersArray = [
        { header: 'Año', key: 'year', width: 10 },
        { header: 'Mes', key: 'month', width: 10 },
        { header: 'Tipología del Acto', key: 'actType', width: 20 },
        { header: 'Tipo de acto', key: 'actTypology', width: 20 },
        { header: 'Denominación acto', key: 'actName', width: 20 },
        { header: 'Número acto', key: 'actNumber', width: 15 },
        { header: 'Fecha acto', key: 'date', width: 15 },
        { header: 'Fecha de publicación en el DO o Fecha de Publicidad', key: 'date2', width: 20 },
        { header: 'Indicación del medio y forma de publicidad', key: 'info', width: 20 },
        { header: 'Tiene efectos generales', key: 'effects', width: 20 },
        { header: 'Fecha última actualización (dd/mm/aaaa), si corresponde a actos y resoluciones con efectos generales', key: 'date3', width: 15 },
        { header: 'Breve descripción del objeto del acto', key: 'description', width: 20 },
        { header: 'Vínculo al texto íntegro y actualizado', key: 'url', width: 20 },
      ];
    const exportExcel = () => {
        const workbook = new ExcelJS.Workbook()
        var sheet = workbook.addWorksheet('sheet')


        sheet.columns = headersArray
        var rows = Array.from(decreesList)
        rows.map(row => {
            sheet.addRow(row)
        })
        
        // sheet.columns.forEach(column => {
        //     let maxLength = 0;
        //     sheet.eachRow({ includeEmpty: true }, (row) => {
        //       const cellValue = row.getCell(column.key).value;
        //       const cellLength = cellValue ? String(cellValue).length : 0;
        //       maxLength = Math.max(maxLength, cellLength);
        //     });
        //     column.width = maxLength + 2; // Ajustar según tus necesidades
        //   });


        var fileName = 'Transparencia' + '_' + moment(Date.now()).format('DD-MM-YYYY') + '.xlsx'

        workbook.xlsx.writeBuffer().then(function (buffer) {
            //console.log(buffer);
            const blob = new Blob([buffer], { type: "applicationi/xlsx" });
            saveAs(blob, fileName);
        });
        
    }



    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='row-header-tiny'>Año</TableCell>
                            <TableCell className='row-header-tiny' >Mes</TableCell>
                            <TableCell className='row-header-tiny' >Tipología del Acto</TableCell>
                            <TableCell className='row-header-tiny'>Tipo de acto</TableCell>
                            <TableCell className='row-header-tiny'>Denominación acto</TableCell>
                            <TableCell className='row-header-tiny'>Número acto</TableCell>
                            <TableCell className='row-header-tiny'>Fecha acto</TableCell>
                            <TableCell className='row-header-tiny'>Fecha de publicación en el DO o Fecha de Publicidad</TableCell>
                            <TableCell className='row-header-tiny'>Indicación del medio y forma de publicidad</TableCell>
                            <TableCell className='row-header-tiny'>Tiene efectos generales</TableCell>
                            <TableCell className='row-header-tiny'>Fecha última actualización (dd/mm/aaaa), si corresponde a actos y resoluciones con efectos generales</TableCell>
                            <TableCell className='row-header-tiny'>Breve descripción del objeto del acto</TableCell>
                            <TableCell className='row-header-tiny'>Vínculo al texto íntegro y actualizado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {decreesList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className='row-tiny'>{row.year}</TableCell>
                                <TableCell className='row-tiny'>{row.month}</TableCell>
                                <TableCell className='row-tiny'>{row.actTypology}</TableCell>
                                <TableCell className='row-tiny'>{row.actType}</TableCell>
                                <TableCell className='row-tiny'>{row.actName}</TableCell>
                                <TableCell className='row-tiny'>{row.folio}</TableCell>
                                <TableCell className='row-tiny'>{row.date}</TableCell>
                                <TableCell className='row-tiny'>{row.date}</TableCell>
                                <TableCell className='row-tiny'>{row.info}</TableCell>
                                <TableCell className='row-tiny'>{row.effects}</TableCell>
                                <TableCell className='row-tiny'>{row.date}</TableCell>
                                <TableCell className='row-tiny'>{row.matter}</TableCell>
                                <TableCell className='row-tiny'>{row.url}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={13}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => exportExcel()}
                                >
                                    Exportar a Excel
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

        </>
    )
}
