import type { AdminTurnProps } from "../../types/turns.types"

const AdminTurn = ({ turn }: AdminTurnProps) => {
  return (
    <div>
        <p>{turn.user_name} {turn.user_surname}</p>
        <p>{turn.user_phone}</p>
        <img src={turn.user_photo} alt={`${turn.user_name} ${turn.user_surname}`} />
        <p>{turn.service_name}</p>
        <p>{turn.date_turn} {turn.time_turn}</p>
        <p>{turn.notes}</p>
    </div>
  )
}

export default AdminTurn