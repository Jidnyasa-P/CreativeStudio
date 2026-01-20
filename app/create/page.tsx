import CreatePage from './client-page'

export const generateStaticParams = () => {
  return [
    { template: '0' },
    { template: '1' },
    { template: '2' },
    { template: '3' },
  ]
}

export default CreatePage
