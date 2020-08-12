import * as React from 'react';
import { connect } from 'react-redux';
import MainDesiresList from '../components/main-list/MainDesiresList';
import { getAllDesires, getAllOffers, getSortingValues } from '../redux/actions/appActions'
import MainListControl from '../components/main-list/MainListControl'
import MainOffersList from '../components/main-list/MainOffersList'
import { hideShowDesire,addComplaint, hideShowOffer, sortDesires, sortOffers, addDesireToFavorites, addOfferToFavorites, deleteFavorite } from '../redux/actions/userActions'

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
