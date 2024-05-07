export const Nutrition = ({ label, quantity, unit}) => {
    return (
        <div>
            <p><b>{label}</b> - <span> {quantity.toFixed(2)} {unit}</span></p>
        </div>
    )
}