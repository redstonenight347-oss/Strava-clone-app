import Map from '@/components/map/Map'


export default function Maps() {
  return (
    <main className='h-[calc(100vh-4rem)] w-full relative'>
      <Map isChangeable={true} />
    </main>
  )
}