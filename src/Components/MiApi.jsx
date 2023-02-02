import React, {useState, useEffect} from "react"
import days from "../js/days"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
var moment = require("moment")
moment().format()

function Holidays() {
  const [holidays, setHolidays] = useState([])
  const [search, setSearch] = useState("")
  const [hideUp, setHideUp] = useState(true)
  const [hideDown, setHideDown] = useState(false)
  
  useEffect(() => {
    holidaysInfo()
  }, [])

  const holidaysInfo = async () => {
    const resHolidays = await fetch(
      "https://api.victorsanmartin.com/feriados/en.json"
    )
    const dataHolidays = await resHolidays.json()
    setHolidays([...dataHolidays.data])
  }

  const order = () => {
    holidays.reverse()
  }

  return (
    <div>
      <InputGroup className="my-3 searchBox">
        <Form.Control
          placeholder="Buscar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroup.Text id="basic-addon2">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
      </InputGroup>
      <Table striped hover>
        <thead>
          <tr>
            <th>
              Fecha
              <button
                className="btnCustom text-light"
                hidden={hideDown}
                onClick={() => {
                  setHideUp(false)
                  setHideDown(true)
                  order()
                }}
              >
                <i className="bi bi-caret-down-fill"></i>
              </button>
              <button
                className="btnCustom text-light"
                hidden={hideUp}
                onClick={() => {
                  setHideUp(true)
                  setHideDown(false)
                  order()
                }}
              >
                <i className="bi bi-caret-up-fill"></i>
              </button>
            </th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Día</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((element, index) => {
            const searchByDate = element.date
            const searchByName = element.title.toLowerCase()
            const searchByType = element.extra.toLowerCase()
            const searchByday =
              days[new Date(element.date).getDay()].toLowerCase()
            if (
              search === "" ||
              searchByDate.includes(search) ||
              searchByName.includes(search.toLowerCase()) ||
              searchByType.includes(search.toLowerCase()) ||
              searchByday.includes(search.toLowerCase())
            )
              return (
                <tr key={index}>
                  <td>{moment(element.date).format("DD/MM/YYYY")}</td>
                  <td>{element.title}</td>
                  <td>{element.extra}</td>
                  <td>{days[new Date(element.date).getDay()]}</td>
                </tr>
              )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Holidays
