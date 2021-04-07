import React from "react";
import "./styles.scss";
import HomeSlider from "../../components/HomeSlider";
import {
  Button,
  Typography,
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
} from "@material-ui/core";
import Slider from "react-slick";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import ProductCard from "../../components/ProductCard";
import ProductCardList from "../../components/ProductCardList";

const brands = [
  { imgPath: "1.png" },
  { imgPath: "2.png" },
  { imgPath: "3.png" },
  { imgPath: "4.png" },
  { imgPath: "1.png" },
  { imgPath: "2.png" },
  { imgPath: "3.png" },
  { imgPath: "4.png" },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <></>,
  prevArrow: <></>,
  appendDots: (dot) => <></>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const productSlickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  nextArrow: <></>,
  prevArrow: <></>,
  appendDots: (dot) => <></>,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

export default function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;

  const [productTab, setProductTab] = useState(0);

  const changeProductTab = (event, value) => {
    setProductTab((prev) => value);
  };

  useEffect(() => {
    dispatch(fetchProductsStart({}));
  }, []);
  console.log(products);
  return (
    <section className="homepage">
      <div className="sliderWrap">
        <HomeSlider />
      </div>
      <div className="siteFeatureWrapRoot">
        <Grid
          container
          className="siteFeatureWrap"
          spacing={4}
          alignItems="center"
        >
          <Grid item xs={12} sm={6} lg={3}>
            <div className="siteFeature">
              <div className="siteFeatureImageWrap">
                <img src="/images/gift_card_icon.png" alt="" />
              </div>
              <div>
                <Typography variant="body1" className="benLabel">
                  BONUS PLUS
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Get a bonus plus for buying more that three products
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="siteFeature">
              <div className="siteFeatureImageWrap">
                <img src="/images/delivery_icon.png" alt="" />
              </div>
              <div>
                <Typography variant="body1" className="benLabel">
                  FREE SHIPING
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  Every Day / Every Order
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="siteFeature">
              <div className="siteFeatureImageWrap">
                <img src="/images/customer_support_icon.png" alt="" />
              </div>
              <div>
                <Typography variant="body1" className="benLabel">
                  FRIENDLY SUPPORT
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  24/7 Dedicated Support
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <div className="siteFeature">
              <div className="siteFeatureImageWrap">
                <img src="/images/refund_icon.png" alt="" />
              </div>
              <div>
                <Typography variant="body1" className="benLabel">
                  SECURE
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  Money Back Guranted
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="productTabs">
        <Tabs onChange={changeProductTab} value={productTab}>
          <Tab label="Featured Products" />
          <Tab label="Latest Products" />
          <Tab label="On Sale Products" />
        </Tabs>
        <Slider {...productSlickSettings}>
          {data &&
            data.map((product, pos) => {
              const configProduct = { ...product };
              return (
                <div className="productCardWrap">
                  <ProductCard {...configProduct} key={pos} />
                </div>
              );
            })}
        </Slider>
      </div>
      <div className="specialDealRootWrap">
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <div className="specialDealWrap">
              <div
                className="specialDealWomanImgWrap"
                style={{ backgroundImage: "url(/images/women_new_deal.png)" }}
              >
                <Typography variant="h6">NEW WOMEN JACK</Typography>
                <Typography variant="body1">
                  Sale up to 30% off all products in the new collection.
                </Typography>
                <Typography variant="body1" component={Link} to="/search">
                  Shop Now
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingBottom: 0 }}>
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              style={{ height: "100%" }}
            >
              <Grid item xs={12} sm={6}>
                <div className="specialDealWrap">
                  <div className="specialDealWrap">
                    <div
                      className="specialDealWomen2ImgWrap"
                      style={{
                        backgroundImage: "url(/images/women_new_deal_2.png)",
                      }}
                    >
                      <Typography variant="h6">BEST WOMEN SUIT</Typography>
                      <Typography variant="body1">Sale up to 30%.</Typography>
                      <Typography variant="body1" component={Link} to="/search">
                        Shop Now
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="specialDealWrap">
                  <div className="specialDealWrap">
                    <div
                      className="specialDealWomen2ImgWrap"
                      style={{
                        backgroundImage: "url(/images/men_new_deal_2.png)",
                      }}
                    >
                      <Typography variant="h6">BEST MEN SUIT</Typography>
                      <Typography variant="body1">Sale up to 30%.</Typography>
                      <Typography variant="body1" component={Link} to="/search">
                        Shop Now
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 0 }}>
                <div className="specialDealWrap">
                  <div className="specialDealWrap">
                    <div
                      className="specialDealManImgWrap"
                      style={{
                        backgroundImage: "url(/images/men_suit_deal.png)",
                      }}
                    >
                      <Typography variant="h6">
                        CASH BIG OFFER ON MAN SUIT
                      </Typography>
                      <Typography variant="body1">Sale up to 20%.</Typography>
                      <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        size="large"
                      >
                        $66.99
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="productStateWrapRoot">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Featured Product</Typography>
            <div className="titleUnderline">
              <div className="subUnderline" />
            </div>
            <div className="productStateList">
              {data &&
                data.map((product, pos) => {
                  const configProduct = { ...product };
                  if (pos > 2) return;
                  return (
                    <div className="productCardWrap">
                      <ProductCardList {...configProduct} key={pos} />
                    </div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Top Selling Product</Typography>
            <div className="titleUnderline">
              <div className="subUnderline" />
            </div>
            <div className="productStateList">
              {data &&
                data.map((product, pos) => {
                  const configProduct = { ...product };
                  if (pos < 3 || pos > 5) return;
                  return (
                    <div className="productCardWrap">
                      <ProductCardList {...configProduct} key={pos} />
                    </div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Hot Offer</Typography>
            <div className="titleUnderline">
              <div className="subUnderline" />
            </div>
            <div className="productStateList">
              {data &&
                data.map((product, pos) => {
                  const configProduct = { ...product };
                  if (pos < 5) return;
                  return (
                    <div className="productCardWrap">
                      <ProductCardList {...configProduct} key={pos} />
                    </div>
                  );
                })}
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="directory">{/* <Directory /> */}</div>
      <div className="subscriptionWrap">
        <div>
          <Typography variant="h4">Subscribe Our Newsletter</Typography>
          <Typography variant="body2" color="textSecondary">
            Stay up to date with our latest new and products
          </Typography>
        </div>
        <div className="formWrap">
          <TextField variant="outlined" label="Email Address" fullWidth />
          <Button
            size="large"
            variant="contained"
            disableElevation
            color="primary"
            className="btn"
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="brandSliderWrap">
        <Typography variant="h5" align="center" color="textSecondary">
          Shop By Brands
        </Typography>
        <Paper className="paper">
          <Slider {...settings}>
            {brands.map((b) => (
              <div className="wrap">
                <img src={`/images/brand/${b.imgPath}`} alt="" />
              </div>
            ))}
          </Slider>
        </Paper>
      </div>
    </section>
  );
}
