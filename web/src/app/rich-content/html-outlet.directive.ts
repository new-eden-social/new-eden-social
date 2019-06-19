import {
  Component,
  Directive,
  NgModule,
  Input,
  ViewContainerRef,
  Compiler,
  ModuleWithComponentFactories,
  ComponentRef,
  Injector,
  OnChanges,
  OnDestroy, OnInit,
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Directive({ selector: 'html-outlet' })
export class HtmlOutletDirective implements OnChanges, OnDestroy, OnInit {

  @Input()
  html: string;

  @Input()
  editable = false;

  private selectionLength: number;

  private cmpRef: ComponentRef<any>;

  constructor(
    private vcRef: ViewContainerRef,
    private compiler: Compiler,
  ) {
  }

  async ngOnInit() {
    await this.createComponent();
  }

  async ngOnChanges() {
    if (this.cmpRef) {
      await this.createComponent();
    }
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  private createComponent() {

    if (this.editable) {
      this.saveSelection();
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    // Create dynamic component with template
    const template = `${this.html}`;
    @Component({
      selector: 'dynamic-html',
      template,
    })
    class DynamicComponent {
    }

    // We have to import all the modules that are going to be used inside
    // rich content here.
    @NgModule({
      imports: [CommonModule, RouterModule, EmojiModule],
      declarations: [DynamicComponent],
    })
    class DynamicHtmlModule {
    }

    return this.compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(
        x => x.componentType === DynamicComponent);
    })
    .then(factory => {
      const injector = Injector.create({ providers: [], parent: this.vcRef.parentInjector });
      this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);

      if (this.editable) {
        this.cmpRef.location.nativeElement.setAttribute('contentEditable', 'true');
        this.restoreSelection();
      }
    });
  }

  private saveSelection() {
    if (
      window.getSelection().rangeCount === 0 ||
      !this.vcRef.element.nativeElement.parentElement ||
      this.vcRef.element.nativeElement.parentElement.children.length < 2
    ) {
      return 0;
    }

    const mainElement = <Element>this.vcRef.element.nativeElement.parentElement.children[1];

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(mainElement);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    this.selectionLength = preSelectionRange.toString().length;
  }

  private restoreSelection() {
    const mainElement = <Element>this.vcRef.element.nativeElement.parentElement.children[1];
    const selection = window.getSelection();
    const pos = this.getTextNodeAtPosition(mainElement, this.selectionLength);
    selection.removeAllRanges();
    const range = new Range();
    range.setStart(pos.node, pos.position);
    selection.addRange(range);
  }

  private getTextNodeAtPosition(root, index) {
    let lastNode = null;

    const treeWalker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Node) => {
          length = node.textContent.length;
          if (index > length) {
            index -= length;
            lastNode = node;
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });
    const c = treeWalker.nextNode();
    return {
      node: c ? c : root,
      position: c ? index : 0,
    };
  }

}
