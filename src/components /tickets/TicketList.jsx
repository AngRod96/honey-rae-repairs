
import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.jsx"
import "./Tickets.css"



export const TicketList = () => {

    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])

    useEffect(() => {
        getAllTickets().then((ticketsArray) => {
            setAllTickets(ticketsArray)
            console.log("tickets set!")
        })
    }, []) //ONLY runs on initial rendder of component

    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }

    }, [showEmergencyOnly, allTickets])

    return (<div className="tickets-container">
        <h2>Tickets</h2>
        <div>
            <button
                className="filter-btn btn-primary"
                onClick={() => {
                    setShowEmergencyOnly(true)
                }}
            >
                Emergency
            </button>
            <button
                className="filter-btn btn-info" //btn-info is css so it makes it the color it is 
                onClick={() => {
                    setShowEmergencyOnly(false)
                }}
            >
                Show All
            </button>
        </div>
        <article className="tickets">
            {filteredTickets.map((ticketObj) => {
                return <Ticket ticket={ticketObj} name="Joe" key={ticketObj.id} />
            })}
        </article>
    </div>
    )
        }