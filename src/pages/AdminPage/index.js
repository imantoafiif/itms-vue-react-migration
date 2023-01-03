import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Search from "../../components/Search";
import Text from "../../components/Search/Text";
import Selector from "../../components/Search/Selector";
import axios from "../../axios-config";
import Matrix from "../../components/Matrix";
import './admin.scss'

// import WithNav from "../layouts/WithNav";

function AdminPage() {

    const crumbs = [
        { label: 'Home', to: '/', key: 'HOME' },
        { label: 'Dashboard', to: '#', key: 'DSHBRD' },
    ]
    const [searchItems, setSearchItems] = useState([
        { type: 'text', placeholder: 'Search 1' },
        { type: 'text', placeholder: 'Search 2' },
        { type: 'text', placeholder: 'Search 3' },
        { type: 'selector', placeholder: 'Search 4', isLoading: true, options: [] }
    ])

    const onSearch = values => {
        console.log('aku terjebak dalam kehidupan', values)
    }

    const fetchSelector = async () => {
        await axios.get(`/ldap/api/users/role-by-role-code`, {
            params: {
                role_code: 'super_admin',
                per_page: 999,
            }
        })
        .then(r => {
            if(Array.isArray(r.data.data) && r.data.data.length) {
                let items = [...searchItems]
                items[3] = { 
                    type: 'selector', 
                    placeholder: 'Search 4', 
                    isLoading: false, 
                    options: r.data.data.map(item => ({
                        value: item.role_code,
                        label: item.role_name,
                    })) 
                }
                setSearchItems(items)
            }
        })
    }

    useEffect(() => {
        fetchSelector()
    }, [])

    return (
        <section className="section-container">
            <div className="columns is-multiline is-marginless is-paddingless">
                <div className="column is-full">
                    <h1 className="title is-3">
                    Dashboard
                    </h1>
                </div>
                <div className="column is-full">
                    <Breadcrumbs items={crumbs} />
                </div>
                <div className="column is-full">
                    <Search onSearch={onSearch}>
                        {
                            searchItems.map((item, key) => {
                                switch(item.type) {
                                    case 'text' :
                                    return (
                                        <Text 
                                            index={key} 
                                            placeholder={item.placeholder}>
                                        </Text>
                                    )
                                    case 'selector' : 
                                    return (
                                        <Selector 
                                            index={key} 
                                            isLoading={item.isLoading} 
                                            placeholder={item.placeholder} 
                                            options={item.options}>    
                                        </Selector>
                                    )
                                }
                            })
                        }
                    </Search>
                </div>
                <div className="column is-full">
                    <Matrix/>
                </div>
            </div>
        </section>
    )
}

export default AdminPage;