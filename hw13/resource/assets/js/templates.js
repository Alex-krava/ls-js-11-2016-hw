module.exports = {
    commentsTemplate: function (address, coord) {
        return `
        <div class="add-comments_container">
            <div class="add-comments_header">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="9px" height="14px">
                    <text font-family="FontAwesome" fill="rgb(255, 255, 255)" font-size="14px" x="0px" y="13px">&#61505;</text>
                </svg>
                <span class="add-comments_header-text">${address}</span>
                <a href="#" class="close-icon" data-btn="close"></a>     
            </div> 
            <div class="add-comments_content">
                  <ul class="add-comments_comment">Отзывов пока нет...</ul>   
                  <div class="add-comments_form">
                    <div class="add-comments_form-title">Ваш отзыв</div>
                    <form class="add-comments_form-form" data-coord="${coord}">
                        <input type="text" class="add-comments_form-item add-comments_form-inputs" placeholder="Ваше имя">
                        <input type="text" class="add-comments_form-item add-comments_form-inputs" placeholder="Укажите место">
                        <textarea class="add-comments_form-textarea add-comments_form-inputs" placeholder="Поделитесь впечатления"></textarea>
                        <div class="add-comments_form-btn-container">
                            <input type="submit" value="Добавить" data-btn="addComment" class="add-comments_form-btn">
                        </div>
                    </form>
                  </div>     
            </div>   
        </div>
    `
    },
    commentSection: function () {
        return `
          {{#each items}}
            <li class="add-comments_comment-item">
                    <span class="add-comments_comment-header">
                        <span class="add-comments_comment-name">{{this.name}}</span>
                        <span class="add-comments_comment-loc">{{this.loc}}</span>
                        <span class="add-comments_comment-date">{{this.date}}</span>
                    </span>
                <span class="add-comments_comment-text">{{this.text}}</span>
            </li>
          {{/each}}
        `
    }
}
