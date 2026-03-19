import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const AverageProcesingTimeChart = ( { data }: { data: any[] } ) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avg_hours" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AverageProcesingTimeChart