import { DataTable } from 'mantine-datatable'
import { Box, Button, Grid, TextInput } from '@mantine/core'
import { IconSearch, IconTrash } from '@tabler/icons-react'
import companies from './data/companies.json'
import { useEffect, useState } from 'react'

const PAGE_SIZE = 30

const CaretakersPage = () => {
  const [query, setQuery] = useState('')

  const [page, setPage] = useState(1)
  const [records, setRecords] = useState(companies.slice(0, PAGE_SIZE))

  const [selectedRecords, setSelectedRecords] = useState<any[]>([])

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE
    setRecords(companies.slice(from, to))
  }, [page])

  return (
    <>
      <DataTable
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        verticalAlignment="top"
        columns={[
          { accessor: 'name' },
          { accessor: 'streetAddress' },
          { accessor: 'city' },
          { accessor: 'state' }
        ]}
        records={records}
        totalRecords={companies.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={p => setPage(p)}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </>
  )
}

export default CaretakersPage
