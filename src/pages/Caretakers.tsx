import { DataTable } from 'mantine-datatable'
import { Button, Grid, TextInput } from '@mantine/core'
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
      <Grid align="center" mb="md">
        <Grid.Col span={6}>
          <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search employees..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={e => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Button
            uppercase
            leftIcon={<IconTrash size={16} />}
            color="red"
            disabled={!selectedRecords.length}
            // onClick={() =>
            //   showNotification({
            //     color: 'red',
            //     message: 'Deleting data is dangerous!'
            //   })
            // }
          >
            {selectedRecords.length
              ? `Delete ${
                  selectedRecords.length === 1
                    ? 'one record'
                    : `${selectedRecords.length} records`
                }`
              : 'Delete selected'}
          </Button>
        </Grid.Col>
      </Grid>
      <DataTable
        height="calc(100vh - 13.7rem)"
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
