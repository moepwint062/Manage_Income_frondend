import React, { useState } from 'react';
import { CREATE_INCOME_URL, CREATE_WISHITEM_URL, GET_CANBUYLIST_URL, GET_INCOME_URL, GET_WISHITEM_URL, TOKEN } from '../../constants/api.path';
import ManageIncomeModal from '../../modalPopups/ManageIncomeModal';
import SaveIncomeModal from '../../modalPopups/SaveIncomeModal';
import WishListModal from '../../modalPopups/WishListModal';

function HomePage() {
    const [showSaveIncomeModal, setSaveIncomeModal] = useState(false);
    const [showWishListModal, setWishListModal] = useState(false);
    const [showManageIncomeModal, setManageIncomeModal] = useState(false);

    const [incomeList, setIncomeList] = useState([]);
    const [canBuyList, setCanBuyLists] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [count, setCount] = useState("");

    const [pageNumber, setPageNumber] = useState();
    const [pageSize, setPageSize] = useState(5);
    
    const usePagination = (posts, defaultPage = 1, amountPerPage = 10) => {
        const [currentPage, setCurrentPage] = useState(defaultPage);
        const [postsPerPage] = useState(amountPerPage);
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        let currentPosts = [];
        let amountOfPages = 0;
        if (Array.isArray(posts)) {
          currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
          amountOfPages = Math.ceil(posts.length / postsPerPage);
        }
        return {
          setCurrentPage,
          amountOfPages,
          currentPosts,
        };
    };
    const { currentPosts, amountOfPages } = usePagination(wishList);
    // console.log(currentPosts, amountOfPages, pageNumber);

    function handlePageChange(page) {
        // console.log(page);
        setPageNumber(page);
    };

    function saveIncome() {
        setSaveIncomeModal(true);
    };

    function addWishList() {
        setWishListModal(true);
        fetch(GET_WISHITEM_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                // console.log(res);
                setWishList(res.data.wishList);
                setCount(res.totalCount);
            } else {
                alert(res.message);
            }
        })
    };

    function manageIncome() {
        fetch(GET_INCOME_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                // console.log(res.data);
                setIncomeList(res.data.incomeList);
            } else {
                alert(res.message);
            }
        })
        setManageIncomeModal(true);
        fetch(GET_CANBUYLIST_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                // console.log(res.data.canBuyLists);
                setCanBuyLists(res.data.canBuyLists);
            } else {
                alert(res.message);
            }
        })
    };

    function saveIncomeAmount(amount) {
        // console.log(amount);
        fetch(CREATE_INCOME_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(amount),
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                // console.log(res);
                alert(res.message);
            } else {
                setSaveIncomeModal(true);
                alert(res.message);
            }
        })
    }

    function saveWishItem(wishItem) {
        // console.log(wishItem);

        fetch(CREATE_WISHITEM_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(wishItem),
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                // console.log(res);
                alert(res.message);
            } else {
                setWishListModal(true);
                alert(res.message);
            }
        })
    }
    return (
        <div className="row justify-content-center main--body">
            <div className="col-md-2">
                <button type='submit' onClick={saveIncome}>Save Income</button>
            </div>
            <div className="col-md-2">
                <button type='submit' onClick={addWishList}>Wish List</button>
            </div>
            <div className="col-md-2">
                <button type='submit' onClick={manageIncome} disabled={incomeList.length === 0 && wishList.length === 0}>Manage Income</button>
            </div>
            <SaveIncomeModal show={showSaveIncomeModal}
            onSubmit={(e)=>{ setSaveIncomeModal(false); saveIncomeAmount(e)}} onHide={()=>setSaveIncomeModal(false)}/>
            <WishListModal show={showWishListModal} details={currentPosts} count={count}
            currentpage={pageNumber} amountofpages={amountOfPages} itemsperpage={10} pagerange={pageSize} onChange={(e)=>handlePageChange(e)}
            onSubmit={(e)=>{ setWishListModal(false); saveWishItem(e)}} onHide={()=>setWishListModal(false)}/>
            <ManageIncomeModal show={showManageIncomeModal} details={canBuyList} 
            onSubmit={()=>setManageIncomeModal(false)} onHide={()=>setManageIncomeModal(false)}/>
        </div>
    );
}
export default HomePage;