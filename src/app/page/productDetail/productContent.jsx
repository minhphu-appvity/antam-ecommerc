import React from 'react';
import image from "./image-temp/image.png"

const ProductContent = () => {
    return (
        <div className='row product-content' image="true">
            <div className='image col-lg-6  col-md-6 col-xs-12'>
                <div className='wrapper'>
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="content col-lg-6 col-md-6 col-xs-12">
                <div className='wrapper'>
                    <h2>chai Lo Acid</h2>
                    <p>hello hehe hello world hehe hello hello hehe hello world hehe hello hello hehe hello
                        world hehe hello hehe hello hello hehe hello world hehe hello hello hehe hello world
                        hehe hello hehe hello hello hehe hello world hehe hello hello hehe hello world hehe
                        hello
                    </p>
                    <h4><span>2.000 - 5.000</span>vnd/1 cái - 1000 cái (Đơn hàng tối thiểu)</h4>
                    <a href="#form-section" className="btn">Nhập thông tin đặt hàng </a>
                </div>

            </div>
        </div>
    );
}

export default ProductContent;