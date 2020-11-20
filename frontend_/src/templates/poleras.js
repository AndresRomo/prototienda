import vitrina from './vitrina'
import crud from '../crud/crud'

async function poleras(){
  const items = await crud.get({'type': 'polera'})
  vitrina(items.items)
}

export default poleras
