
import vitrina from './vitrina'
import crud from '../crud/crud'

async function template_otros(){
  const items = await crud.get({'type': 'otros'})
  vitrina(items.items)
}

export default template_otros
