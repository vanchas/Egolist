import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Categories from '../components/categories/Categories';
import MainDesiresList from '../components/main-list/MainDesiresList';
import { getAllDesires, getAllOffers, getSortingValues } from '../redux/actions/actions'
import MainListControl from '../components/main-list/MainListControl'
import MainOffersList from '../components/main-list/MainOffersList'
import { hideShowDesire,addComplaint, hideShowOffer, sortDesires, sortOffers, addDesireToFavorites, addOfferToFavorites, deleteFavorite } from '../redux/actions/userActions'
import Alert from "../components/helpers/Alert";

function App(props) {
	const [visibleComponent, setVisibleComponent] = React.useState('desires');

	React.useEffect(() => {
		props.getAllDesires();
		props.getAllOffers();
		props.getSortingValues();
	}, []);

	const changeComponent = ref => {
		setVisibleComponent(ref);
	}

	return (
		<div >
			{props.alert && <Alert />}
			<Categories />
			<MainListControl
				changeComponent={changeComponent}
				visibleComponent={visibleComponent}
				sortDesires={props.sortDesires}
				sortOffers={props.sortOffers}
				sortingValues={props.sortingValues}
			/>
			{visibleComponent === 'desires' ?
				<MainDesiresList
					addComplaint={props.addComplaint}
					success={props.success}
					addDesireToFavorites={props.addDesireToFavorites}
					hideShowDesire={props.hideShowDesire}
					desires={props.desires}
					deleteFavorite={props.deleteFavorite} />
				: <MainOffersList
					addComplaint={props.addComplaint}
					success={props.success}
					addOfferToFavorites={props.addOfferToFavorites}
					hideShowOffer={props.hideShowOffer}
					offers={props.offers}
					deleteFavorite={props.deleteFavorite} />}
		</div>
	);
}

const mapStateToProps = (state) => ({
	desires: state.app.desires,
	offers: state.app.offers,
	success: state.app.success,
	alert: state.app.alert,
	sortingValues: state.app.sortingValues
});

const mapDispatchToProps = {
	getAllDesires,
	getAllOffers,
	hideShowDesire,
	hideShowOffer,
	sortDesires,
	sortOffers,
	addDesireToFavorites,
	addOfferToFavorites,
	deleteFavorite,
	addComplaint,
	getSortingValues
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
