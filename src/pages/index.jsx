import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Categories from '../components/categories/Categories';
import MainDesiresList from '../components/main-list/MainDesiresList';
import { getAllDesires, getAllOffers } from '../redux/actions/actions'
import MainListControl from '../components/main-list/MainListControl'
import MainOffersList from '../components/main-list/MainOffersList'
import { hideShowDesire, hideShowOffer, sortDesires, sortOffers, addDesireToFavorites, addOfferToFavorites, deleteFavorite } from '../redux/actions/userActions'

function App(props) {
	const [visibleComponent, setVisibleComponent] = React.useState('desires');

	React.useEffect(() => {
		props.getAllDesires();
		props.getAllOffers();
	}, []);

	const changeComponent = ref => {
		setVisibleComponent(ref);
	}

	return (
		<div >
			<Categories />
			<MainListControl
				changeComponent={changeComponent}
				visibleComponent={visibleComponent}
				sortDesires={props.sortDesires}
				sortOffers={props.sortOffers}
			/>
			{visibleComponent === 'desires' ?
				<MainDesiresList
					success={props.success}
					addDesireToFavorites={props.addDesireToFavorites}
					hideShowDesire={props.hideShowDesire}
					desires={props.desires}
					deleteFavorite={props.connectdeleteFavorite} />
				: <MainOffersList
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
	success: state.app.success
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
	deleteFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
