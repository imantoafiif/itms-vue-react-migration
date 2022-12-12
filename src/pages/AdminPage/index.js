import React from "react";
import { useSelector } from "react-redux";
import { counterSlice } from "../../store/slices/sessionSlice";
import Breadcrumbs from "../../components/Breadcrumbs";
import Search from "../../components/Search";
import Text from "../../components/Search/Text";

// import WithNav from "../layouts/WithNav";

function AdminPage() {

    const counter = useSelector(counterSlice)
    const crumbs = [
        { label: 'Home', to: '/', key: 'HOME' },
        { label: 'Dashboard', to: '#', key: 'DSHBRD' },
      ]

    const onSearch = values => {
        console.log('aku terjebak dalam kehidupan', values)
    }

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
                    </Search>
                </div>
            </div>
        </section>
    )
}

export default AdminPage;