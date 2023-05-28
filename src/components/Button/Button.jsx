import css from './Button.module.css'
export const ButtonSeeMore = ({onClick}) => {
    return (
        <button type='botton' className={css.Button} onClick={onClick} >See More</button>
    )
}