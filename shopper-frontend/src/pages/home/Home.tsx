import { ChangeEvent, useState } from 'react'
import './home.css'
import axios from 'axios';
import ProductUpdateList from '../../components/product-update-list/ProductUpdateList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ProductPriceUpdateProxy {
  product_code: number;
  name?: string;
  current_price?: string;
  new_price?: string;
  errors?: string[];
}


function Home() {
  const [jsonData, setJsonData] = useState<{}>()
  const [apiResponse, setApiResponse] = useState<ProductPriceUpdateProxy[]>()

  const notifyError = (text: string) => toast.error(text);

  const convertCSVToJson = (csvData: string) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: { [key: string]: string } = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim();
      }

      result.push(obj);
    }

    return result;
  };

  const handleCSVInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJsonData(undefined)
    setApiResponse([])

    if (event.target.files === null) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target === null) return;

      const csvData = e.target.result as string;
      const jsonData = convertCSVToJson(csvData);
      setJsonData(jsonData);
    };

    reader.readAsText(file);
  };

  const validate = () => {
    axios.post<ProductPriceUpdateProxy[]>('http://localhost:3000/products/new-price/validate', jsonData)
      .then(response => {
        setApiResponse(response.data)
      })
      .catch(error => {
        error.response.data.message.forEach(
          (m: string) => notifyError(m)
        )
      })
  }

  const update = () => {
    axios.put('http://localhost:3000/products/new-price/update', jsonData)
      .then(_ => {
        toast.success('Preços atualizados com sucesso'),
          setJsonData(undefined),
          setApiResponse([])
      }
      )
      .catch(error => {
        error.response.data.message.forEach(
          (m: string) => notifyError(m)
        )
      })
  }

  return (
    <div className='body'>
      <div className='file-area'>
        <input type="file" accept=".csv" onChange={handleCSVInputChange} />

        <div>
          <button onClick={validate} disabled={!jsonData}>
            VALIDAR
          </button>
          <button
            onClick={update}
            disabled={!apiResponse || apiResponse?.every(e => e.errors?.length !== 0)}>
            ATUALIZAR
          </button>
        </div>
      </div>

      <div>
        {apiResponse ? (
          <ProductUpdateList productPriceUpdateList={apiResponse} />
        ) : (
          <div></div>
        )
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
