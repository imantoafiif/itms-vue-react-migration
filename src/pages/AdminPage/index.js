import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { counterSlice } from "../../store/slices/sessionSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import Search from "../../components/Search";
import Text from "../../components/Search/Text";
import Selector from "../../components/Search/Selector";
import axios from "../../axios-config";

// import WithNav from "../layouts/WithNav";

function AdminPage() {

    const [options, setOptions] = useState(null)
    const counter = useSelector(counterSlice)
    const crumbs = [
        { label: 'Home', to: '/', key: 'HOME' },
        { label: 'Dashboard', to: '#', key: 'DSHBRD' },
      ]

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
                setOptions(r.data.data.map(item => ({
                    value: item.role_code,
                    label: item.role_name,
                })))
            }
        })
    }

    useEffect(() => {
        fetchSelector()
    }, [])

    useEffect(() => {
        console.log('options', options)
    }, [options])

    return (
        <section style={{margin: '24px'}}>
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
                        <Text
                            index={0}
                            placeholder="Search 1">
                        </Text>
                        <Text
                            index={1}
                            placeholder="Search 2">
                        </Text>
                        <Text
                            index={2}
                            placeholder="Search 3">
                        </Text>
                        <Selector
                            index={3}
                            isLoading={!options}
                            placeholder="Search 4"
                            options={options}>
                        </Selector>
                    </Search>
                </div>
            </div>
        </section>
    )
}

export default AdminPage;