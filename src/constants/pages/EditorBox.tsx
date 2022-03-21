import React from "react";

import EditorBoxType from "./enums/EditorBoxType";
import ColorProps from "./interfaces/ColorProps";
import NumberProps from "./interfaces/NumberProps";
import EditorBoxProps from "./interfaces/EditorBoxProps";
import ImageProps from "./interfaces/ImageProps";
import RangeInputProps from "./interfaces/RangeInputProps";

import './css/editorBox.less';

class EditorBox extends React.Component<EditorBoxProps, any>{
  public constructor(props: EditorBoxProps) {
    super(props);
  }

  //#region Functions

  private onImagesClick(event: any): void {
    let imageContainer = event.target.parentElement as HTMLElement;
    if (imageContainer.id === '') imageContainer = imageContainer.parentElement as HTMLElement;
    const contentContainer = imageContainer.parentElement as HTMLElement;
    let images = contentContainer.querySelectorAll('.image-container') as NodeListOf<HTMLElement>;
    if (images.length === 0) images = contentContainer.querySelectorAll('.half-image-container') as NodeListOf<HTMLElement>;
    const index = parseInt(imageContainer.id.slice(0, imageContainer.id.indexOf('-'))) as number;

    const half = imageContainer.parentElement as HTMLElement;
    // const editorBox = half.parentElement as HTMLElement;
    const boxId = half.id as string;

    images.forEach((e: HTMLElement) => {
      if (e.classList.contains('active') && e !== imageContainer) e.classList.remove('active');
    });

    if (!imageContainer.classList.contains('active')) {
      imageContainer.classList.add('active');

      let data = {
        index: index,
        containerId: boxId
      }

      this.props.onPress(data);
    }
  }

  private onColorsClick(event: any): void {
    const colorContainer = event.target as HTMLElement;
    const color = colorContainer.classList[1] as string;
    const colorNumber = parseInt(color.slice(6)) as number;

    const half = colorContainer.parentElement as HTMLElement;
    const editorBox = half.parentElement as HTMLElement;
    const boxId = editorBox.id as string;

    const data = {
      color: colorNumber,
      containerId: boxId
    };

    this.props.onPress(data);
  }

  private onNumbersClick(event: any): void {
    let numberContainer = event.target as HTMLElement;
    if (numberContainer.tagName === 'P') numberContainer = numberContainer.parentElement as HTMLElement;

    const contentContainer = numberContainer.parentElement as HTMLElement;
    const numbers = contentContainer.querySelectorAll('.number-container') as NodeListOf<Element>;
    const index = parseInt(numberContainer.id.slice(0, numberContainer.id.indexOf('-'))) as number;

    const editorBox = contentContainer.parentElement as HTMLElement;
    let boxId = contentContainer.id as string;
    if (boxId == '') boxId = editorBox.id;

    numbers.forEach((e: Element) => {
      if (e.classList.contains('active') && e.parentElement === contentContainer && e !== numberContainer) e.classList.remove('active');
    });

    if (!numberContainer.classList.contains('active')) {
      numberContainer.classList.add('active');

      const data = {
        index: index,
        containerId: boxId
      }

      this.props.onPress(data);
    }
  }

  private onRangeChanges(event: any): void {
    const rangeContainer = event.target as HTMLInputElement;
    const value = Number.parseFloat(rangeContainer.value) as number;

    const contentContainer = rangeContainer.parentElement as HTMLElement;
    if (rangeContainer.min == '-1' && rangeContainer.max == '1') {
      const subtitle = contentContainer.querySelector('.subtitle') as HTMLElement;
      const subtitleValue = value * 100 as number;
      subtitle.innerHTML = `${Number.parseInt(subtitleValue.toString())}%`;
    }

    const boxId = contentContainer.id as string;

    const data = {
      index: value,
      containerId: boxId
    }

    this.props.onPress(data);
  }

  //#endregion

  //#region Containers

  private ImageContainer(props: ImageProps): JSX.Element {
    return (
      <React.Fragment>
        <div className={`image-container${props.isActive ? ' active' : ''}`} id={`${props.index}-image`} onClick={props.onPress} >

          <img src={props.image} alt="" />

          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="image-container-background">
            <path d="M1.00098 149V23.0769V1H119.001V143.253L114.627 149H1.00098Z" className="path" />
          </svg>
        </div>
      </React.Fragment>
    )
  }

  private HalfImageContainer(props: ImageProps): JSX.Element {
    return (
      <div className={`half-image-container${props.isActive ? ' active' : ''}`} id={`${props.index}-half-image`} onClick={props.onPress}>
        <img src={props.image} alt="" />
      </div>
    )
  }

  private ColorContainer(props: ColorProps): JSX.Element {
    return (
      <React.Fragment>
        <div className={`color-container color-${props.color} ${props.isActive ? ' active' : ''}`} id={`${props.index}-color`} onClick={props.onPress}>
        </div>
      </React.Fragment>
    )
  }

  private NumberContainer(props: NumberProps): JSX.Element {
    return (
      <React.Fragment>
        <div className={`number-container ${props.isActive ? 'active' : ''}`} id={`${props.index}-number`} onClick={props.onPress}>
          <p className="number">{props.title}</p>
        </div>
      </React.Fragment>
    )
  }

  private RangeInput(props: RangeInputProps): JSX.Element {
    return (
      <React.Fragment>
        <div className={`range-input-container`} id={props.id}>
          <div className="text">
            <p className="title">{props.name}</p>
            <p className="subtitle">0%</p>
          </div>
          <input type="range" className="slider" name={props.name} min={-1.0} max={1.0} step={0.01} defaultValue={0} onChange={props.onChangeInput} />
        </div>
      </React.Fragment>
    );
  }

  //#endregion

  render() {
    switch (this.props.type) {
      case EditorBoxType.FullImages:
        return (
          <React.Fragment>
            <div className="editorBox-box full-images">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  {
                    this.props.content ? this.props.content.map((value: any, index: number) => {
                      return (<this.ImageContainer image={value.image} isActive={value.isActive} index={value.index ? value.index : index} key={index} onPress={this.onImagesClick.bind(this)} />)
                    }) : <></>
                  }
                </div>
              </div>

              <svg width="543" height="367" viewBox="41 41 543 367" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M584 132.25V408H41V41H569.115L584 58.3698V132.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      case EditorBoxType.FullColors:
        return (
          <React.Fragment>
            <div className="editorBox-box">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  {
                    this.props.colors ? this.props.colors.map((value: any, index: number) => {
                      return (<this.ColorContainer color={value.color} isActive={value.isActive} index={value.index ? value.index : index} key={index} onPress={this.onColorsClick.bind(this)} />)
                    }) : <></>
                  }
                </div>
              </div>

              <svg width="384" height="231" viewBox="39 39 387 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M424 97.25V268H41V41H409.532L424 58.362V97.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      case EditorBoxType.FullNumbers:
        return (
          <React.Fragment>
            <div className="editorBox-box">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  {
                    this.props.content ? this.props.content.map((value: any, index: number) => {
                      return (<this.NumberContainer title={value.title} isActive={value.isActive} index={value.index ? value.index : 0} key={index} onPress={this.onNumbersClick.bind(this)} />);
                    }) : <></>
                  }
                </div>
              </div>

              <svg width="384" height="231" viewBox="39 39 387 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M424 97.25V268H41V41H409.532L424 58.362V97.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      case EditorBoxType.HalfImagesColors:
        return (
          <React.Fragment>
            <div className="editorBox-box">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  <div className="left-half images">
                    {
                      this.props.content ? this.props.content.map((value: any, index: number) => {
                        return (<this.HalfImageContainer image={value.image} isActive={value.isActive} index={value.index ? value.index : 0} key={index} onPress={this.onImagesClick.bind(this)} />);
                      }) : <></>
                    }
                  </div>
                  <div className="right-half colors">
                    {
                      this.props.colors ? this.props.colors.map((value: any, index: number) => {
                        return (<this.ColorContainer color={value.color} index={value.index ? value.index : 0} key={index} onPress={this.onColorsClick.bind(this)} />);
                      }) : <></>
                    }
                  </div>
                </div>
              </div>

              <svg width="384" height="231" viewBox="39 39 387 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M424 97.25V268H41V41H409.532L424 58.362V97.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      case EditorBoxType.HalfNumbersColors:
        return (
          <React.Fragment>
            <div className="editorBox-box">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  <div className="left-half">
                    {
                      this.props.content ? this.props.content.map((value: any, index: number) => {
                        return (<this.NumberContainer title={value.title} isActive={value.isActive} index={value.index ? value.index : 0} key={index} onPress={this.onNumbersClick.bind(this)} />);
                      }) : <></>
                    }
                  </div>
                  <div className="right-half">
                    {
                      this.props.colors ? this.props.colors.map((value: ColorProps, index: number) => {
                        return (<this.ColorContainer color={value.color} isActive={value.isActive} index={value.index ? value.index : 0} key={index} onPress={this.onColorsClick.bind(this)} />)
                      }) : <></>
                    }
                  </div>
                </div>
              </div>

              <svg width="384" height="231" viewBox="39 39 387 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M424 97.25V268H41V41H409.532L424 58.362V97.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      case EditorBoxType.RangeInputs:
        return (
          <React.Fragment>
            <div className="editorBox-box">
              <div className="editorBox-container">
                <div className="text-container">
                  <p className="title">{this.props.title}</p>
                  <p className="subtitle">{this.props.subTitle}</p>
                </div>

                <div className="content-container" id={this.props.id}>
                  {
                    this.props.content ? this.props.content.map((value: any, index: number) => {
                      return (<this.RangeInput name={value.name} id={value.id} key={index} onChangeInput={this.onRangeChanges.bind(this)} />)
                    }) : <></>
                  }
                </div>
              </div>

              <svg width="384" height="231" viewBox="39 39 387 231" fill="none" xmlns="http://www.w3.org/2000/svg" className="editorBox-background-svg">
                <path d="M424 97.25V268H41V41H409.532L424 58.362V97.25Z" className="path" />
              </svg>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>ОШИБКА</React.Fragment>
        )

    }
  }
}

export default EditorBox;