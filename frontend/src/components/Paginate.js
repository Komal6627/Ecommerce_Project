import { Pagination } from "@mui/material"
import {LinkContainer } from "react-router-bootstrap"

const Paginate = ({page, pages, keyword}) =>{
    return(
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((pageNumber) => (
                    <LinkContainer key={pageNumber + 1} to= {keyword ? `/search/${keyword}/pages/${pageNumber + 1}` : `/page/${pageNumber + 1}`}>
                        <Pagination.Item active={pageNumber + 1 === page}>
                            {pageNumber + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate