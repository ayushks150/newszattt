import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: 'general',
        mode: 'light'
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        mode: PropTypes.string,
    }

    capitalize=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],// [this.articles] -- fetch data from json file
            loading: false,
            page: 1
        }
        document.title = `${this.capitalize(this.props.category)} - NEWSzatt`;
    }


    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ddb5f3f71743829be8495c0ed35381&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({ 
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading:false })
            this.props.setProgress(100);
    }

    handleNext = async () => {
        
        this.props.setProgress(10);
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ddb5f3f71743829be8495c0ed35381&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(50);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
        
        this.props.setProgress(100);
    }

    handlePrevious = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e3ddb5f3f71743829be8495c0ed35381&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100);

    }

    render() {

        
        return (
            <div className='container my-3' style = {{color: this.props.mode==='dark'? 'white' : 'black'}} >
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px'}}>NEWSzaat - Latest news from {this.capitalize(this.props.category)}</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 95) : ""} description={element.description ? element.description.slice(0, 71) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}

                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className={`btn mx-2 btn-${this.props.mode==='light'? 'dark' : 'primary'}`} onClick={this.handlePrevious} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className={`btn mx-2 btn-${this.props.mode==='light'? 'dark' : 'primary'}`} onClick={this.handleNext}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
