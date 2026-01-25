import { Button, Input, Select, Space, Card } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useState } from 'react'

export type QueueFilters = {
  search: string
  status: string | null
  priority: string | null
}

export default function QueueFilterBar({
  onChange,
}: {
  onChange: (filters: QueueFilters) => void
}) {
  const [filters, setFilters] = useState<QueueFilters>({
    search: '',
    status: null,
    priority: null,
  })

  const updateFilters = (changes: Partial<QueueFilters>) => {
    const updated = { ...filters, ...changes }
    setFilters(updated)
    onChange(updated)
  }

  const resetFilters = () => {
    const cleared = {
      search: '',
      status: null,
      priority: null,
    }
    setFilters(cleared)
    onChange(cleared)
  }

  return (
    <Card className="shadow-sm">
      <Space
        wrap
        size="middle"
        className="w-full justify-between"
      >
        {/* Left side filters */}
        <Space wrap>
          <Input
            allowClear
            placeholder="Search queue #, user, service"
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(e) =>
              updateFilters({ search: e.target.value })
            }
            style={{ width: 260 }}
          />

          <Select
            allowClear
            placeholder="Status"
            style={{ width: 160 }}
            value={filters.status}
            onChange={(value) =>
              updateFilters({ status: value })
            }
            options={[
              { label: 'Waiting', value: 'waiting' },
              { label: 'Processing', value: 'processing' },
              { label: 'Completed', value: 'completed' },
            ]}
          />

          <Select
            allowClear
            placeholder="Priority"
            style={{ width: 160 }}
            value={filters.priority}
            onChange={(value) =>
              updateFilters({ priority: value })
            }
            options={[
              { label: 'Normal', value: 'normal' },
              { label: 'Urgent', value: 'urgent' },
            ]}
          />
        </Space>

        {/* Right side actions */}
        <Button
          icon={<ReloadOutlined />}
          onClick={resetFilters}
        >
          Reset
        </Button>
      </Space>
    </Card>
  )
}
