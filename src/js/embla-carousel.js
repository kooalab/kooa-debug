const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) {
      prevBtn.removeAttribute('disabled')
      prevBtn.classList.add('magnetic')
    }
    else {
      prevBtn.setAttribute('disabled', 'disabled')
      prevBtn.classList.remove('magnetic')
    }

    if (emblaApi.canScrollNext()) {
      nextBtn.removeAttribute('disabled')
      nextBtn.classList.add('magnetic')
    }
    else {
      nextBtn.setAttribute('disabled', 'disabled')
      nextBtn.classList.remove('magnetic')
    }
  }

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)

  return () => {
    prevBtn.removeAttribute('disabled')
    nextBtn.removeAttribute('disabled')
    prevBtn.classList.add('magnetic')
    nextBtn.classList.add('magnetic')
  }
}

export const addPrevNextBtnsClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  const scrollPrev = () => {
    emblaApi.scrollPrev()
  }
  const scrollNext = () => {
    emblaApi.scrollNext()
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
    emblaApi,
    prevBtn,
    nextBtn
  )

  return () => {
    removeTogglePrevNextBtnsActive()
    prevBtn.removeEventListener('click', scrollPrev, false)
    nextBtn.removeEventListener('click', scrollNext, false)
  }
}
