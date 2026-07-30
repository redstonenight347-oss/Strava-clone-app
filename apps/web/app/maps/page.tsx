import MapClientWrapper from '@/components/map/MapClientWrapper'


export default function Maps() {
  return (
    <main className='h-[calc(100vh-4rem)] w-full relative'>
      <MapClientWrapper isStatic={false} />
    </main>
  )
}