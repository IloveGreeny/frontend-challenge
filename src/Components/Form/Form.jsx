import './Form.css';
import Arrow from "../Arrow/Arrow";
import { useState, useEffect,useMemo,useCallback } from 'react';
import { useLocalStorage } from "../Hooks/useLocalStorage/useLocalStorage";

export default function Form() {
    const initialFormData = {
        projectName: '',
        genre: '',
        format: '',
        country: '',
        productionInfo: '',
        costInfo: '',
        synopsis: ''
    };

    const [formData, setFormData] = useLocalStorage('FormData', initialFormData);
    const [isFormComplete, setIsFormComplete] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const requiredFieldsFilled = useMemo(() => (
        formData.projectName.trim() &&
        formData.genre.trim() &&
        formData.format.trim() &&
        formData.country.trim()
    ), [formData]);

    const handleSave = useCallback(() => {
        setSubmitted(true);

        if (requiredFieldsFilled) {
            alert('Form data saved to local storage!');
        }
    }, [requiredFieldsFilled]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        setIsFormComplete(requiredFieldsFilled || !submitted);
    }, [requiredFieldsFilled, submitted]);

    const handleCancel = () => {
        setFormData(initialFormData);
        localStorage.removeItem('FormData');
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="main-title">Производственные параметры фильма</h1>
                <button className="cancel-button" onClick={handleCancel}>Отменить заполнение</button>
            </div>
            <div className="form-container">
                <div className="column">
                    <div className="form-group">
                        <label className="label">Название проекта</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className={`input ${submitted && !formData.projectName ? 'required' : ''}`}
                                placeholder="Название"
                            />
                            {submitted && !formData.projectName && <span className="error-message">Заполните поле</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Жанр</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className={`input ${submitted && !formData.genre ? 'required' : ''}`}
                                placeholder="Жанр"
                            />
                            {submitted && !formData.genre && <span className="error-message">Заполните поле</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Формат (для онлайн-платформ, большого экрана, интернета, другое)</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="format"
                                value={formData.format}
                                onChange={handleChange}
                                className={`input ${submitted && !formData.format ? 'required' : ''}`}
                                placeholder="Формат"
                            />
                            {submitted && !formData.format && <span className="error-message">Заполните поле</span>}
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="label">№ УНФ или отсутствует</label>
                        <input
                            type="text"
                            name="productionInfo"
                            value={formData.productionInfo}
                            onChange={handleChange}
                            className="input"
                            placeholder="890-000-000-00-000"
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="form-group">
                        <label className="label">Страна-производитель (коппродукция)</label>
                        <div className="input-container">
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`input ${submitted && !formData.country ? 'required' : ''}`}
                                placeholder="Страна"
                            />
                            {submitted && !formData.country && <span className="error-message">Заполните поле</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть</label>
                        <input
                            type="text"
                            name="costInfo"
                            value={formData.costInfo}
                            onChange={handleChange}
                            className="input"
                            placeholder="Сметная стоимость"
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Синопсис</label>
                        <div className="input-container">
                            <textarea
                                name="synopsis"
                                value={formData.synopsis}
                                onChange={handleChange}
                                className="input synopsis-input"
                                placeholder="Напишите краткое изложение"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <div className="pagination-container">
                    <span className="active">1</span>
                    <span>2</span>
                    <span>...</span>
                    <span>4</span>
                    <span><Arrow w='16px' h='16px' color='#000000' /></span>
                </div>
                <div className="confirm-button-container">
                    <button
                        onClick={handleSave}
                        className={`submit-button ${isFormComplete ? 'enabled' : 'disabled'}`}
                        disabled={!isFormComplete}
                    >
                        Следующий шаг
                        <span>
                            <Arrow w='16px'
                                   h='16px'
                                   color={isFormComplete ? "#FFFFFF" : "#666666"}
                                   className={isFormComplete ? "blue-arrow" : "grey-arrow"}
                            />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};









